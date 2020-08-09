"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relationTypes = exports.RelationType = void 0;
var RelationType;
(function (RelationType) {
    RelationType["BelongsToOneRelation"] = "BelongsToOneRelation";
    RelationType["HasManyRelation"] = "HasManyRelation";
    RelationType["HasOneRelation"] = "HasOneRelation";
    RelationType["ManyToManyRelation"] = "ManyToManyRelation";
    RelationType["HasOneThroughRelation"] = "HasOneThroughRelation";
})(RelationType = exports.RelationType || (exports.RelationType = {}));
exports.relationTypes = [
    RelationType.BelongsToOneRelation,
    RelationType.HasManyRelation,
    RelationType.HasOneRelation,
    RelationType.ManyToManyRelation,
    RelationType.HasOneThroughRelation,
];
