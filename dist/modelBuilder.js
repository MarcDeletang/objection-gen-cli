"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModels = void 0;
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = require("./utils");
const createCustomType = async () => utils_1.abortablePrompts(utils_1.textPromptOption("Enter your custom property type, it will be written as is"));
const createType = async () => {
    const { value } = await utils_1.abortablePrompts({
        type: "select",
        choices: [
            { title: "string", value: "string" },
            { title: "number", value: "number" },
            { title: "boolean", value: "boolean" },
            { title: "date", value: "Date" },
            { title: "other", value: "other" },
        ],
        initial: 0,
        name: "value",
        message: "What is your property type ?",
    });
    if (value === "other") {
        return createCustomType();
    }
    return { value };
};
const createProperty = async () => {
    const { value: name } = await utils_1.abortablePrompts(utils_1.textPromptOption("What is your property name ?", {
        validate: (v) => v.replace(/\s/g, "") ? true : "Your property must have a name",
        format: (v) => v.replace(/\s/g, ""),
    }));
    const optional = await utils_1.yesOrNoPrompts("Is this property optionnal ? y/N", "n");
    const { value: type } = await createType();
    return { name, type, optional };
};
const createProperties = async (properties = []) => {
    const { name, type, optional } = await createProperty();
    while (await utils_1.yesOrNoPrompts("Do you want to add a property ? Y/n", "y")) {
        return createProperties([...properties, { name, type, optional }]);
    }
    return [...properties, { name, type, optional }];
};
exports.createModels = async (models = []) => {
    console.log("Its model time !");
    const { value: name } = await utils_1.abortablePrompts(utils_1.textPromptOption("What is your model name ? (will be use as is in filename)", {
        validate: (v) => v.replace(/\s/g, "") ? true : "Your model must have a name",
        format: (v) => v.replace(/\s/g, ""),
    }));
    const { value: table } = await utils_1.abortablePrompts(utils_1.textPromptOption("What is your table name ?", {
        initial: lodash_1.default.snakeCase(name).toLowerCase(),
    }));
    console.log("Its properties time !");
    const properties = await createProperties();
    while (await utils_1.yesOrNoPrompts("Do you want to create another model ? Y/n", "y")) {
        return exports.createModels([
            ...models,
            { name, table, properties, relations: [] },
        ]);
    }
    return [...models, { name, table, properties, relations: [] }];
};
