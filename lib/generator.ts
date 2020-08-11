import { join } from "path";
import _ from "lodash";
import fs from "fs-extra";
import { Model, Property, Relation, RelationType } from "./model";
import { Extension } from "./setupBuilder";
import { yesOrNoPrompts } from "./utils";

const generateProperties = (properties: Property[]) =>
  properties
    .map((p) => `    public ${p.name}${p.optional ? "?" : ""}: ${p.type};`)
    .join("\n");

const generateRelationRequire = (model: Model) =>
  _.uniqBy(
    model.relations.filter((r) => r.modelClass !== model.name),
    "modelClass"
  )
    .map(
      (r) =>
        `        const { ${_.upperFirst(r.modelClass)} } = require('./${
          r.modelClass
        }');`
    )
    .join("\n");

const generateThroughRelation = (r: Relation) => {
  if (
    r.join.type === RelationType.ManyToManyRelation ||
    r.join.type === RelationType.HasOneThroughRelation
  ) {
    return `
                    through: {
                        from: '${r.join.through.from}',
                        to: '${r.join.through.to}'
                    },`;
  }
  return "";
};

const generateTo = (relation: Relation, models: Model[]) => {
  const target = models.find((m) => m.name === relation.modelClass);

  if (!target) {
    return relation.join.to;
  }
  return `${target.table}.${relation.join.to}`;
};

const generateRelations = (currentModel: Model, models: Model[]) =>
  currentModel.relations
    .map(
      (r) => `            ${r.name}: {
                relation: Model.${r.join.type},
                modelClass: ${_.upperFirst(r.modelClass)},
                join: {
                    from: '${currentModel.table}.${
        r.join.from
      }', ${generateThroughRelation(r)}
                    to: '${generateTo(r, models)}'
                }
            },`
    )
    .join("\n");

const generateTemplate = (currentModel: Model, models: Model[]) => `
import { Model } from 'objection';

export class ${_.upperFirst(currentModel.name)} extends Model {
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

const generateModel = (
  path: string,
  extension: Extension,
  currentModel: Model,
  models: Model[]
) => {
  const filename = join(path, currentModel.name + extension);

  fs.outputFile(filename, generateTemplate(currentModel, models), "utf8");
};

export const generate = async (
  path: string,
  extension: Extension,
  models: Model[]
) => {
  console.log("Here are your models:");
  for (let i = 0; i !== models.length; ++i) {
    console.log("==========", models[i].name, "==========");
    console.log(generateTemplate(models[i], models));
  }
  if (await yesOrNoPrompts("Do you wish to generate those models ?", "y")) {
    return Promise.all(
      models.map((m) => generateModel(path, extension, m, models))
    );
  }
};
