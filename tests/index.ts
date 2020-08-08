const sample = [
    {
        name: 'user', table: 'users', properties: [{
            name: 'id',
            type: 'number',
            optional: false
        },
        {
            name: 'firstName',
            type: 'string',
            optional: true
        }], relations: [{
            name: 'products',
            modelClass: 'product',
            join: {
                type: RelationType.HasManyRelation,
                from: 'id',
                to: 'user_id'
            },
            addToProperties: true,
        },
        {
            name: 'dad',
            modelClass: 'user',
            join: {
                type: RelationType.HasOneRelation,
                from: 'dad_id',
                to: 'id'
            },
            addToProperties: true,
        },
        {
            name: 'userProducts',
            modelClass: 'product',
            join: {
                type: RelationType.ManyToManyRelation,
                from: 'id',
                to: 'id',
                through: {
                    from: 'user_product.user_id',
                    to: 'user_product.product_id',
                }
            },
            addToProperties: true,
        }]
    },
    { name: 'product', table: 'products', properties: [], relations: [] },
    { name: 'userProduct', table: 'user_product', properties: [], relations: [] }];
