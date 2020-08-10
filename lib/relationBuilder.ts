import _ from "lodash";
import { abortablePrompts, yesOrNoPrompts, textPromptOption } from "./utils";
import {
  relationTypes,
  Model,
  Relation,
  JoinType,
  RelationType,
} from "./model";

const createModelClass = async (models: Model[]): Promise<string> => {
  const { value } = await abortablePrompts<string>({
    type: "select",
    choices: models.map((m) => ({
      title: _.upperFirst(m.name),
      value: m.name,
    })),
    initial: 0,
    name: "value",
    message: "What is the modelClass ?",
  });
  return value;
};

const createJoin = async (): Promise<JoinType> => {
  const { value: type } = await abortablePrompts<RelationType>({
    type: "select",
    choices: relationTypes.map((m) => ({
      title: m,
      value: m,
    })),
    initial: 0,
    name: "value",
    message: "What is the type of the relation ?",
  });
  const { value: from } = await abortablePrompts<string>(
    textPromptOption(
      "What is the key in this table ? (table name will be auto filled)"
    )
  );

  const { value: to } = await abortablePrompts<string>(
    textPromptOption(
      "What is the key in the foreign table ? (table name will be auto filled)"
    )
  );

  if (
    type === RelationType.ManyToManyRelation ||
    type === RelationType.HasOneThroughRelation
  ) {
    const { value: throughFrom } = await abortablePrompts<string>(
      textPromptOption(
        "What is the value for through.from (don't for forget to specify the table) ?"
      )
    );

    const { value: throughTo } = await abortablePrompts<string>(
      textPromptOption(
        "What is the to value for through.to (don't for forget to specify the table) ?"
      )
    );
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

const createRelation = async (models: Model[]): Promise<Relation> => {
  const { value: name } = await abortablePrompts<string>(
    textPromptOption("What is your relation name ?", {
      validate: (v) =>
        v.replace(/\s/g, "") ? true : "Your relation must have a name",
      format: (v) => v.replace(/\s/g, ""),
    })
  );
  const modelClass = await createModelClass(models);
  const join = await createJoin();
  return {
    name,
    modelClass,
    join,
  };
};

const createRelationsForOne = async (
  currentModel: Model,
  models: Model[]
): Promise<Model> => {
  while (await yesOrNoPrompts("Do you want to add a relation ? Y/n", "y")) {
    const relation = await createRelation(models);
    return createRelationsForOne(
      { ...currentModel, relations: [...currentModel.relations, relation] },
      models
    );
  }
  return { ...currentModel, relations: [...currentModel.relations] };
};

export const createRelations = async (
  models: Model[] = []
): Promise<Model[]> => {
  const modelsWithRelations: Model[] = [];
  console.log("Its relation time !");

  for (let i = 0; i !== models.length; ++i) {
    const model = models[i];
    console.log("Relations for", model.name);
    modelsWithRelations.push(await createRelationsForOne(model, models));
  }
  return modelsWithRelations;
};
