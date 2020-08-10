"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const path_1 = require("path");
const lodash_1 = __importDefault(require("lodash"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const model_1 = require("./model");
const utils_1 = require("./utils");
const generateProperties = (properties) => properties
    .map((p) => `    public ${p.name}${p.optional ? "?" : ""}: ${p.type};`)
    .join("\n");
// TODO later maybe
// const generateRelationProperties = (relations: Relation[]) =>
//     relations.filter(r => r.addToProperties)
//         .map(r => `    public ${r.name}: ${_.upperFirst(r.modelClass)}${hasManyRelation(r.join.type) ? '[]': ''};`)
//         .join('\n');
const generateRelationRequire = (model) => lodash_1.default.uniqBy(model.relations.filter((r) => r.modelClass !== model.name), "modelClass")
    .map((r) => `        const { ${lodash_1.default.upperFirst(r.modelClass)} } = require('./${r.modelClass}');`)
    .join("\n");
const generateThroughRelation = (r) => {
    if (r.join.type === model_1.RelationType.ManyToManyRelation ||
        r.join.type === model_1.RelationType.HasOneThroughRelation) {
        return `
                    through: {
                        from: '${r.join.through.from}',
                        to: '${r.join.through.to}'
                    },`;
    }
    return "";
};
const generateTo = (relation, models) => {
    const target = models.find((m) => m.name === relation.modelClass);
    if (!target) {
        return relation.join.to;
    }
    return `${target.table}.${relation.join.to}`;
};
const generateRelations = (currentModel, models) => currentModel.relations
    .map((r) => `            ${r.name}: {
                relation: Model.${r.join.type},
                modelClass: ${lodash_1.default.upperFirst(r.modelClass)},
                join: {
                    from: '${currentModel.table}.${r.join.from}', ${generateThroughRelation(r)}
                    to: '${generateTo(r, models)}'
                }
            },`)
    .join("\n");
const generateTemplate = (currentModel, models) => `
import { Model } from 'objection';

export class ${lodash_1.default.upperFirst(currentModel.name)} extends Model {
${generateProperties(currentModel.properties)}

    static get tableName() {
        return '${currentModel.table}';
    }

    static get relationMappings() {
${generateRelationRequire(currentModel)}

        return {
${generateRelations(currentModel, models)}
        };
    }

}

`;
const generateModel = (path, extension, currentModel, models) => {
    const filename = path_1.join(path, currentModel.name + extension);
    fs_extra_1.default.outputFile(filename, generateTemplate(currentModel, models), "utf8");
};
exports.generate = async (path, extension, models) => {
    console.log("Here are your models:");
    for (let i = 0; i !== models.length; ++i) {
        console.log("==========", models[i].name, "==========");
        console.log(generateTemplate(models[i], models));
    }
    if (await utils_1.yesOrNoPrompts("Do you wish to generate those models ?", "y")) {
        return Promise.all(models.map((m) => generateModel(path, extension, m, models)));
    }
};
