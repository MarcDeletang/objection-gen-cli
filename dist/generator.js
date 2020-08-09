"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
var path_1 = require("path");
var lodash_1 = __importDefault(require("lodash"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var model_1 = require("./model");
var utils_1 = require("./utils");
var generateProperties = function (properties) {
    return properties
        .map(function (p) { return "    public " + p.name + (p.optional ? "?" : "") + ": " + p.type + ";"; })
        .join("\n");
};
// TODO later maybe
// const generateRelationProperties = (relations: Relation[]) =>
//     relations.filter(r => r.addToProperties)
//         .map(r => `    public ${r.name}: ${_.upperFirst(r.modelClass)}${hasManyRelation(r.join.type) ? '[]': ''};`)
//         .join('\n');
var generateRelationRequire = function (model) {
    return lodash_1.default.uniqBy(model.relations.filter(function (r) { return r.modelClass !== model.name; }), "modelClass")
        .map(function (r) {
        return "        const { " + lodash_1.default.upperFirst(r.modelClass) + " } = require('./" + r.modelClass + "');";
    })
        .join("\n");
};
var generateThroughRelation = function (r) {
    if (r.join.type === model_1.RelationType.ManyToManyRelation ||
        r.join.type === model_1.RelationType.HasOneThroughRelation) {
        return "\n                    through: {\n                        from: '" + r.join.through.from + "',\n                        to: '" + r.join.through.to + "'\n                    },";
    }
    return "";
};
var generateTo = function (relation, models) {
    var target = models.find(function (m) { return m.name === relation.modelClass; });
    if (!target) {
        return relation.join.to;
    }
    return target.table + "." + relation.join.to;
};
var generateRelations = function (currentModel, models) {
    return currentModel.relations
        .map(function (r) { return "            " + r.name + ": {\n                relation: Model." + r.join.type + ",\n                modelClass: " + lodash_1.default.upperFirst(r.modelClass) + ",\n                join: {\n                    from: '" + currentModel.table + "." + r.join.from + "', " + generateThroughRelation(r) + "\n                    to: '" + generateTo(r, models) + "'\n                }\n            },"; })
        .join("\n");
};
var generateTemplate = function (currentModel, models) { return "\nimport { Model } from 'objection';\n\nexport class " + lodash_1.default.upperFirst(currentModel.name) + " extends Model {\n" + generateProperties(currentModel.properties) + "\n\n    static get tableName() {\n        return '" + currentModel.table + "';\n    }\n\n    static get relationMappings() {\n" + generateRelationRequire(currentModel) + "\n\n        return {\n" + generateRelations(currentModel, models) + "\n        };\n    }\n\n}\n\n"; };
var generateModel = function (path, extension, currentModel, models) {
    var filename = path_1.join(path, currentModel.name + extension);
    fs_extra_1.default.outputFile(filename, generateTemplate(currentModel, models), "utf8");
};
exports.generate = function (path, extension, models) { return __awaiter(void 0, void 0, void 0, function () {
    var i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Here are your models:");
                for (i = 0; i !== models.length; ++i) {
                    console.log("==========", models[i].name, "==========");
                    console.log(generateTemplate(models[i], models));
                }
                return [4 /*yield*/, utils_1.yesOrNoPrompts("Do you wish to generate those models ?", "y")];
            case 1:
                if (_a.sent()) {
                    return [2 /*return*/, Promise.all(models.map(function (m) { return generateModel(path, extension, m, models); }))];
                }
                return [2 /*return*/];
        }
    });
}); };
