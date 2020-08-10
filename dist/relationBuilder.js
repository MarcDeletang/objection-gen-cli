"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRelations = void 0;
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = require("./utils");
const model_1 = require("./model");
const createModelClass = async (models) => {
    const { value } = await utils_1.abortablePrompts({
        type: "select",
        choices: models.map((m) => ({
            title: lodash_1.default.upperFirst(m.name),
            value: m.name,
        })),
        initial: 0,
        name: "value",
        message: "What is the modelClass ?",
    });
    return value;
};
const createJoin = async () => {
    const { value: type } = await utils_1.abortablePrompts({
        type: "select",
        choices: model_1.relationTypes.map((m) => ({
            title: m,
            value: m,
        })),
        initial: 0,
        name: "value",
        message: "What is the type of the relation ?",
    });
    const { value: from } = await utils_1.abortablePrompts(utils_1.textPromptOption("What is the key in this table ? (table name will be auto filled)"));
    const { value: to } = await utils_1.abortablePrompts(utils_1.textPromptOption("What is the key in the foreign table ? (table name will be auto filled)"));
    if (type === model_1.RelationType.ManyToManyRelation ||
        type === model_1.RelationType.HasOneThroughRelation) {
        const { value: throughFrom } = await utils_1.abortablePrompts(utils_1.textPromptOption("What is the value for through.from (don't for forget to specify the table) ?"));
        const { value: throughTo } = await utils_1.abortablePrompts(utils_1.textPromptOption("What is the to value for through.to (don't for forget to specify the table) ?"));
        return {
            type,
            from,
            to,
            through: {
                from: throughFrom,
                to: throughTo,
            },
        };
    }
    return { type, from, to };
};
const createRelation = async (models) => {
    const { value: name } = await utils_1.abortablePrompts(utils_1.textPromptOption("What is your relation name ?", {
        validate: (v) => v.replace(/\s/g, "") ? true : "Your relation must have a name",
        format: (v) => v.replace(/\s/g, ""),
    }));
    const modelClass = await createModelClass(models);
    const join = await createJoin();
    return {
        name,
        modelClass,
        join,
    };
};
const createRelationsForOne = async (currentModel, models) => {
    while (await utils_1.yesOrNoPrompts("Do you want to add a relation ? Y/n", "y")) {
        const relation = await createRelation(models);
        return createRelationsForOne({ ...currentModel, relations: [...currentModel.relations, relation] }, models);
    }
    return { ...currentModel, relations: [...currentModel.relations] };
};
exports.createRelations = async (models = []) => {
    const modelsWithRelations = [];
    console.log("Its relation time !");
    for (let i = 0; i !== models.length; ++i) {
        const model = models[i];
        console.log("Relations for", model.name);
        modelsWithRelations.push(await createRelationsForOne(model, models));
    }
    return modelsWithRelations;
};
