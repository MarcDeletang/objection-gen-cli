import _ from "lodash";
import {
  abortablePrompts,
  yesOrNoPrompts,
  textPromptOption,
  PromptResponse,
} from "./utils";
import { Property, Model } from "./model";
import { Extension } from "./setupBuilder";

const createCustomType = async (): Promise<PromptResponse<string>> =>
  abortablePrompts(
    textPromptOption(
      "Enter your custom property type, it will be written as is"
    )
  );

const createType = async (): Promise<PromptResponse<string>> => {
  const { value } = await abortablePrompts<string>({
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

const createProperty = async (): Promise<Property> => {
  const { value: name } = await abortablePrompts<string>(
    textPromptOption("What is your property name ?", {
      validate: (v) =>
        v.replace(/\s/g, "") ? true : "Your property must have a name",
      format: (v) => v.replace(/\s/g, ""),
    })
  );

  const optional = await yesOrNoPrompts(
    "Is this property optionnal ? y/N",
    "n"
  );

  const { value: type } = await createType();
  return { name, type, optional };
};

const createProperties = async (
  properties: Property[] = []
): Promise<Property[]> => {
  const { name, type, optional } = await createProperty();

  while (await yesOrNoPrompts("Do you want to add a property ? Y/n", "y")) {
    return createProperties([...properties, { name, type, optional }]);
  }
  return [...properties, { name, type, optional }];
};

export const createModels = async (
  extenstion: Extension,
  models: Model[] = []
): Promise<Model[]> => {
  console.log("Its model time !");
  const { value: name } = await abortablePrompts<string>(
    textPromptOption(
      "What is your model name ? (will be use as is in filename)",
      {
        validate: (v) =>
          v.replace(/\s/g, "") ? true : "Your model must have a name",
        format: (v) => v.replace(/\s/g, ""),
      }
    )
  );
  const { value: table } = await abortablePrompts<string>(
    textPromptOption("What is your table name ?", {
      initial: _.snakeCase(name).toLowerCase(),
    })
  );
  let properties: Property[] = [];
  if (extenstion === Extension.Typescript) {
    console.log("Its properties time !");
    properties = await createProperties();
  }

  while (
    await yesOrNoPrompts("Do you want to create another model ? Y/n", "y")
  ) {
    return createModels(extenstion, [
      ...models,
      { name, table, properties, relations: [] },
    ]);
  }
  return [...models, { name, table, properties, relations: [] }];
};
