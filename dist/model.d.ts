export declare type Property = {
    name: string;
    type: string;
    optional: boolean;
};
export declare enum RelationType {
    BelongsToOneRelation = "BelongsToOneRelation",
    HasManyRelation = "HasManyRelation",
    HasOneRelation = "HasOneRelation",
    ManyToManyRelation = "ManyToManyRelation",
    HasOneThroughRelation = "HasOneThroughRelation"
}
export declare const relationTypes: RelationType[];
export declare type JoinType = {
    type: RelationType.BelongsToOneRelation | RelationType.HasManyRelation | RelationType.HasOneRelation;
    from: string;
    to: string;
} | {
    type: RelationType.ManyToManyRelation | RelationType.HasOneThroughRelation;
    from: string;
    to: string;
    through: {
        from: string;
        to: string;
    };
};
export declare type Relation = {
    name: string;
    modelClass: string;
    join: JoinType;
    addToProperties: boolean;
};
export declare type Model = {
    name: string;
    table: string;
    properties: Property[];
    relations: Relation[];
};
