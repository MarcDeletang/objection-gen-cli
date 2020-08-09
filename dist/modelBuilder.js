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
exports.createModels = void 0;
var lodash_1 = __importDefault(require("lodash"));
var utils_1 = require("./utils");
var createCustomType = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, utils_1.abortablePrompts({
                type: "text",
                name: "value",
                message: "Enter your custom property type, it will be written as is",
            })];
    });
}); };
var createType = function () { return __awaiter(void 0, void 0, void 0, function () {
    var value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utils_1.abortablePrompts({
                    type: "select",
                    choices: [
                        { title: "string", value: "string" },
                        { title: "number", value: "number" },
                        { title: "boolean", value: "boolean" },
                        { title: "date", value: "date" },
                        { title: "other", value: "other" },
                    ],
                    initial: 0,
                    name: "value",
                    message: "What is your property type ?",
                })];
            case 1:
                value = (_a.sent()).value;
                if (value === "other") {
                    return [2 /*return*/, createCustomType()];
                }
                return [2 /*return*/, { value: value }];
        }
    });
}); };
var createProperty = function () { return __awaiter(void 0, void 0, void 0, function () {
    var name, optional, type;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utils_1.abortablePrompts({
                    type: "text",
                    name: "value",
                    message: "What is your property name ?",
                    validate: function (v) {
                        return v.replace(/\s/g, "") ? true : "Your property must have a name";
                    },
                    format: function (v) { return v.replace(/\s/g, ""); },
                })];
            case 1:
                name = (_a.sent()).value;
                return [4 /*yield*/, utils_1.yesOrNoPrompts("Is this property optionnal ? y/N", "n")];
            case 2:
                optional = _a.sent();
                return [4 /*yield*/, createType()];
            case 3:
                type = (_a.sent()).value;
                return [2 /*return*/, { name: name, type: type, optional: optional }];
        }
    });
}); };
var createProperties = function (properties) {
    if (properties === void 0) { properties = []; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, name, type, optional;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, createProperty()];
                case 1:
                    _a = _b.sent(), name = _a.name, type = _a.type, optional = _a.optional;
                    _b.label = 2;
                case 2: return [4 /*yield*/, utils_1.yesOrNoPrompts("Do you want to add a property ? Y/n", "y")];
                case 3:
                    if (!_b.sent()) return [3 /*break*/, 4];
                    return [2 /*return*/, createProperties(__spreadArrays(properties, [{ name: name, type: type, optional: optional }]))];
                case 4: return [2 /*return*/, __spreadArrays(properties, [{ name: name, type: type, optional: optional }])];
            }
        });
    });
};
exports.createModels = function (models) {
    if (models === void 0) { models = []; }
    return __awaiter(void 0, void 0, void 0, function () {
        var name, table, properties;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Its model time !");
                    return [4 /*yield*/, utils_1.abortablePrompts({
                            type: "text",
                            name: "value",
                            message: "What is your model name ? (will be use as is in filename)",
                            validate: function (v) {
                                return v.replace(/\s/g, "") ? true : "Your model must have a name";
                            },
                            format: function (v) { return v.replace(/\s/g, ""); },
                        })];
                case 1:
                    name = (_a.sent()).value;
                    return [4 /*yield*/, utils_1.abortablePrompts({
                            type: "text",
                            name: "value",
                            initial: lodash_1.default.snakeCase(name).toLowerCase(),
                            message: "What is your table name ?",
                        })];
                case 2:
                    table = (_a.sent()).value;
                    console.log("Its properties time !");
                    return [4 /*yield*/, createProperties()];
                case 3:
                    properties = _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, utils_1.yesOrNoPrompts("Do you want to create another model ? Y/n", "y")];
                case 5:
                    if (!_a.sent()) return [3 /*break*/, 6];
                    return [2 /*return*/, exports.createModels(__spreadArrays(models, [
                            { name: name, table: table, properties: properties, relations: [] },
                        ]))];
                case 6: return [2 /*return*/, __spreadArrays(models, [{ name: name, table: table, properties: properties, relations: [] }])];
            }
        });
    });
};
