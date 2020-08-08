export var RelationType;
(function (RelationType) {
    RelationType["BelongsToOneRelation"] = "BelongsToOneRelation";
    RelationType["HasManyRelation"] = "HasManyRelation";
    RelationType["HasOneRelation"] = "HasOneRelation";
    RelationType["ManyToManyRelation"] = "ManyToManyRelation";
    RelationType["HasOneThroughRelation"] = "HasOneThroughRelation";
})(RelationType || (RelationType = {}));
export const relationTypes = [RelationType.BelongsToOneRelation,
    RelationType.HasManyRelation,
    RelationType.HasOneRelation,
    RelationType.ManyToManyRelation,
    RelationType.HasOneThroughRelation];
//# sourceMappingURL=model.js.map