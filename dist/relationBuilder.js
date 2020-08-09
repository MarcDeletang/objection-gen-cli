"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRelations = void 0;
var lodash_1 = __importDefault(require("lodash"));
var utils_1 = require("./utils");
var model_1 = require("./model");
var createModelClass = function (models) { return __awaiter(void 0, void 0, void 0, function () {
    var value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utils_1.abortablePrompts({
                    type: "select",
                    choices: models.map(function (m) { return ({
                        title: lodash_1.default.upperFirst(m.name),
                        value: m.name,
                    }); }),
                    initial: 0,
                    name: "value",
                    message: "What is the modelClass ?",
                })];
            case 1:
                value = (_a.sent()).value;
                return [2 /*return*/, value];
        }
    });
}); };
var createJoin = function () { return __awaiter(void 0, void 0, void 0, function () {
    var type, from, to, throughFrom, throughTo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utils_1.abortablePrompts({
                    type: "select",
                    choices: model_1.relationTypes.map(function (m) { return ({
                        title: m,
                        value: m,
                    }); }),
                    initial: 0,
                    name: "value",
                    message: "What is the type of the relation ?",
                })];
            case 1:
                type = (_a.sent()).value;
                return [4 /*yield*/, utils_1.abortablePrompts({
                        type: "text",
                        name: "value",
                        message: "What is the key in this table ? (table name will be auto filled)",
                    })];
            case 2:
                from = (_a.sent()).value;
                return [4 /*yield*/, utils_1.abortablePrompts({
                        type: "text",
                        name: "value",
                        message: "What is the key in the foreign table ? (table name will be auto filled)",
                    })];
            case 3:
                to = (_a.sent()).value;
                if (!(type === model_1.RelationType.ManyToManyRelation ||
                    type === model_1.RelationType.HasOneThroughRelation)) return [3 /*break*/, 6];
                return [4 /*yield*/, utils_1.abortablePrompts({
                        type: "text",
                        name: "value",
                        message: "What is the value for through.from (don't for forget to specify the table) ?",
                    })];
            case 4:
                throughFrom = (_a.sent()).value;
                return [4 /*yield*/, utils_1.abortablePrompts({
                        type: "text",
                        name: "value",
                        message: "What is the to value for through.to (don't for forget to specify the table) ?",
                    })];
            case 5:
                throughTo = (_a.sent()).value;
                return [2 /*return*/, {
                        type: type,
                        from: from,
                        to: to,
                        through: {
                            from: throughFrom,
                            to: throughTo,
                        },
                    }];
            case 6: return [2 /*return*/, { type: type, from: from, to: to }];
        }
    });
}); };
var createRelation = function (models) { return __awaiter(void 0, void 0, void 0, function () {
    var name, modelClass, join;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utils_1.abortablePrompts({
                    type: "text",
                    name: "value",
                    message: "What is your relation name ?",
                    validate: function (v) {
                        return v.replace(/\s/g, "") ? true : "Your relation must have a name";
                    },
                    format: function (v) { return v.replace(/\s/g, ""); },
                })];
            case 1:
                name = (_a.sent()).value;
                return [4 /*yield*/, createModelClass(models)];
            case 2:
                modelClass = _a.sent();
                return [4 /*yield*/, createJoin()];
            case 3:
                join = _a.sent();
                return [2 /*return*/, {
                        name: name,
                        modelClass: modelClass,
                        join: join,
                        // Feature Not activated
                        addToProperties: false,
                    }];
        }
    });
}); };
var createRelationsForOne = function (currentModel, models) { return __awaiter(void 0, void 0, void 0, function () {
    var relation;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utils_1.yesOrNoPrompts("Do you want to add a relation ? Y/n", "y")];
            case 1:
                if (!_a.sent()) return [3 /*break*/, 3];
                return [4 /*yield*/, createRelation(models)];
            case 2:
                relation = _a.sent();
                return [2 /*return*/, createRelationsForOne(__assign(__assign({}, currentModel), { relations: __spreadArrays(currentModel.relations, [relation]) }), models)];
            case 3: return [2 /*return*/, __assign(__assign({}, currentModel), { relations: __spreadArrays(currentModel.relations) })];
        }
    });
}); };
exports.createRelations = function (models) {
    if (models === void 0) { models = []; }
    return __awaiter(void 0, void 0, void 0, function () {
        var modelsWithRelations, i, model, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    modelsWithRelations = [];
                    console.log("Its relation time !");
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i !== models.length)) return [3 /*break*/, 4];
                    model = models[i];
                    console.log("Relations for", model.name);
                    _b = (_a = modelsWithRelations).push;
                    return [4 /*yield*/, createRelationsForOne(model, models)];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 3;
                case 3:
                    ++i;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, modelsWithRelations];
            }
        });
    });
};
