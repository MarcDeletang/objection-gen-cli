export type Property = {
  name: string;
  type: string;
  optional: boolean;
};

export enum RelationType {
  BelongsToOneRelation = "BelongsToOneRelation",
  HasManyRelation = "HasManyRelation",
  HasOneRelation = "HasOneRelation",
  ManyToManyRelation = "ManyToManyRelation",
  HasOneThroughRelation = "HasOneThroughRelation",
}

export const relationTypes = [
  RelationType.BelongsToOneRelation,
  RelationType.HasManyRelation,
  RelationType.HasOneRelation,
  RelationType.ManyToManyRelation,
  RelationType.HasOneThroughRelation,
];

// Unused and mess typing
// export const hasManyRelation = (type: RelationType) => type === RelationType.HasManyRelation || type === RelationType.ManyToManyRelation;
// export const isThroughRelation = (type: RelationType) => type === RelationType.ManyToManyRelation || type === RelationType.HasOneThroughRelation;

export type JoinType =
  | {
      type:
        | RelationType.BelongsToOneRelation
        | RelationType.HasManyRelation
        | RelationType.HasOneRelation;
      from: string;
      to: string;
    }
  | {
      type:
        | RelationType.ManyToManyRelation
        | RelationType.HasOneThroughRelation;
      from: string;
      to: string;
      through: {
        from: string;
        to: string;
      };
    };

export type Relation = {
  name: string;
  modelClass: string;
  join: JoinType;
  addToProperties?: boolean;
};

export type Model = {
  name: string;
  table: string;
  properties: Property[];
  relations: Relation[];
};
