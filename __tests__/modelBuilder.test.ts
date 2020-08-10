import prompts from "prompts";
import { flatMapDeep } from "lodash";

import { createModels } from "../lib/modelBuilder";
import { Model } from "../lib/model";
import { mockPromptsValue } from "./utils";

jest.mock("prompts");

const testModels: Model[] = [
  {
    name: "user",
    table: "users",
    properties: [
      {
        name: "id",
        type: "number",
        optional: true,
      },
    ],
    relations: [],
  },
  {
    name: "product",
    table: "products",
    properties: [
      {
        name: "colors",
        type: "Color[]",
        optional: false,
      },
    ],
    relations: [],
  },
];

const testModelsProperties: Model[] = [
  {
    name: "user",
    table: "users",
    properties: [
      {
        name: "id",
        type: "number",
        optional: true,
      },
      {
        name: "colors",
        type: "Color[]",
        optional: false,
      },
      {
        name: "firstName",
        type: "string",
        optional: false,
      },
      {
        name: "isActive",
        type: "bool",
        optional: false,
      },
      {
        name: "birthDate",
        type: "Date",
        optional: false,
      },
    ],
    relations: [],
  },
];

export const getPropertiesPromptValues = (model: Model): string[] =>
  flatMapDeep(
    model.properties.map(({ name, type, optional }, idx) => {
      const res = [name, optional ? "y" : "n"];

      if (
        type === "string" ||
        type === "number" ||
        type === "boolean" ||
        type === "Date"
      ) {
        res.push(type);
      }
      // We need to answer 2 prompts for a custom type
      else {
        res.push("other");
        res.push(type);
      }

      // We don't have more properties to add
      if (idx === model.properties.length - 1) {
        return [...res, "n"];
      }
      return [...res, "y"];
    })
  );

export const getModelsPromptsValues = (models: Model[]): string[] =>
  flatMapDeep(
    models.map((model, idx) => {
      const res = [model.name, model.table];

      res.push(...getPropertiesPromptValues(model));

      // We don't have more models to add
      if (idx === models.length - 1) {
        return [...res, "n"];
      }
      return [...res, "y"];
    })
  );

describe("Testing model builder", () => {
  test("Create one model and stop", async () => {
    mockPromptsValue(prompts, ...getModelsPromptsValues([testModels[0]]));

    const models = await createModels();

    expect(models).toStrictEqual([testModels[0]]);
  });

  test("Create more than one model and stop", async () => {
    mockPromptsValue(prompts, ...getModelsPromptsValues(testModels));

    const models = await createModels();

    expect(models).toStrictEqual(testModels);
  });

  test("Create more than one property and stop", async () => {
    mockPromptsValue(prompts, ...getModelsPromptsValues(testModelsProperties));

    const models = await createModels();

    expect(models).toStrictEqual(testModelsProperties);
  });
});
