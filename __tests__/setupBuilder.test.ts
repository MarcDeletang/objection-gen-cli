import prompts from "prompts";
import { createSetup, Extension } from "../lib/setupBuilder";
import { mockPromptsValue } from "./utils";

jest.mock("prompts");

const pathTest = "path/to/folder";
const extensionTest = {
  [Extension.Typescript]: true,
  [Extension.Javascript]: false,
};

describe("Testing setup", () => {
  test("Testing javascript extension", async () => {
    mockPromptsValue(prompts, pathTest, extensionTest[Extension.Javascript]);

    const { path, extension } = await createSetup();
    expect(path).toBe(pathTest);
    expect(extension).toBe(Extension.Javascript);
  });

  test("Testing typescript extension", async () => {
    mockPromptsValue(prompts, pathTest, extensionTest[Extension.Typescript]);

    const { path, extension } = await createSetup();
    expect(path).toBe(pathTest);
    expect(extension).toBe(Extension.Typescript);
  });
});

// const sample = [
//   {
//     name: "user",
//     table: "users",
//     properties: [
//       {
//         name: "id",
//         type: "number",
//         optional: false,
//       },
//       {
//         name: "firstName",
//         type: "string",
//         optional: true,
//       },
//     ],
//     relations: [
//       {
//         name: "products",
//         modelClass: "product",
//         join: {
//           type: RelationType.HasManyRelation,
//           from: "id",
//           to: "user_id",
//         },
//         addToProperties: true,
//       },
//       {
//         name: "dad",
//         modelClass: "user",
//         join: {
//           type: RelationType.HasOneRelation,
//           from: "dad_id",
//           to: "id",
//         },
//         addToProperties: true,
//       },
//       {
//         name: "userProducts",
//         modelClass: "product",
//         join: {
//           type: RelationType.ManyToManyRelation,
//           from: "id",
//           to: "id",
//           through: {
//             from: "user_product.user_id",
//             to: "user_product.product_id",
//           },
//         },
//         addToProperties: true,
//       },
//     ],
//   },
//   { name: "product", table: "products", properties: [], relations: [] },
//   { name: "userProduct", table: "user_product", properties: [], relations: [] },
// ];
