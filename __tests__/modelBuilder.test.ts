import prompts from "prompts";
import { flatMapDeep } from "lodash";
import { createModels } from "../lib/modelBuilder";
import { mockPromptsValue } from "./utils";
import { Model } from "../lib/model";

jest.mock("prompts");

const model: Model = {
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
};

describe("Testing setup", () => {
  test("Testing javascript extension", async () => {
    mockPromptsValue(
      prompts,
      model.name,
      model.table,
      ...flatMapDeep(
        model.properties.map(({ name, type, optional }, idx) => {
          const res = [name, optional ? "y" : "n", type];

          // We don't have
          if (idx === model.properties.length - 1) {
            return [...res, "n"];
          }
          return [...res, "y"];
        })
      )
    );

    const models = createModels();
    console.log("models", models);
  });
});
