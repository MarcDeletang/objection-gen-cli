import prompts from "prompts";

import { Model, Relation, RelationType } from "../lib/model";
import { createRelations } from "../lib/relationBuilder";
import { mockPromptsValue } from "./utils";

jest.mock("prompts");

const testModels: Model[] = [
  {
    name: "user",
    table: "users",
    properties: [],
    relations: [],
  },
  {
    name: "product",
    table: "products",
    properties: [],
    relations: [],
  },
];

const relationsHasMany: Relation[] = [
  {
    name: "products",
    modelClass: "product",
    join: {
      type: RelationType.HasManyRelation,
      from: "id",
      to: "buyer_id",
    },
  },
];

const relationsBelongsToOne: Relation[] = [
  {
    name: "buyer",
    modelClass: "user",
    join: {
      type: RelationType.BelongsToOneRelation,
      from: "buyer_id",
      to: "id",
    },
  },
];

const relationsManyToMany: Relation[] = [
  {
    name: "products",
    modelClass: "product",
    join: {
      type: RelationType.ManyToManyRelation,
      from: "id",
      to: "id",
      through: {
        from: "user_product.user_id",
        to: "user_product.product_id",
      },
    },
  },
];

const relationsHasOneThrough: Relation[] = [
  {
    name: "buyer",
    modelClass: "user",
    join: {
      type: RelationType.HasOneThroughRelation,
      from: "id",
      to: "id",
      through: {
        from: "user_product.product_id",
        to: "user_product.user_id",
      },
    },
  },
];

describe("Testing relation builder", () => {
  test("Create HasMany and BelongsToOne relation with valid keys", async () => {
    mockPromptsValue(
      prompts,
      "y", // Add relations to user
      "products", // Relation name
      "product", // ModelClass
      RelationType.HasManyRelation, // Relation type
      "id", // Key in table 'users'
      "buyer_id", // Key in table 'products'
      "n", // We don't want to add a relation for user
      "y", // Add relation for product
      "buyer", // Relation name
      "user", // ModelClass
      RelationType.BelongsToOneRelation, // Relation type
      "buyer_id", // Key in table 'products'
      "id", // Key in table 'users'
      "n" // We don't want to add a relation for product
    );

    const models = await createRelations(testModels);
    expect(models[0].relations).toStrictEqual(relationsHasMany);
    expect(models[1].relations).toStrictEqual(relationsBelongsToOne);
  });

  test("Create ManyToMany and HasOneThrough relation with valid keys", async () => {
    mockPromptsValue(
      prompts,
      "y", // Add relations to user
      "products", // Relation name
      "product", // ModelClass
      RelationType.ManyToManyRelation, // Relation type
      "id", // Key in table 'users'
      "id", // Key in table 'products'
      "user_product.user_id", // through.from
      "user_product.product_id", // through.to
      "n", // We don't want to add a relation for user
      "y", // Add relation for product
      "buyer", // Relation name
      "user", // ModelClass
      RelationType.HasOneThroughRelation, // Relation type
      "id", // Key in table 'products'
      "id", // Key in table 'users'
      "user_product.product_id", // through.from
      "user_product.user_id", // through.to
      "n" // We don't want to add a relation for product
    );

    const models = await createRelations(testModels);
    expect(models[0].relations).toStrictEqual(relationsManyToMany);
    expect(models[1].relations).toStrictEqual(relationsHasOneThrough);
  });
});
