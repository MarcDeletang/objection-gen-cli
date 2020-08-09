#! /usr/bin/env node
import { createModels } from './modelBuilder.js';
import { createSetup } from './setupBuilder.js';
import { createRelations } from './relationBuilder.js';
import { generate } from './generator.js';

import { Model, RelationType } from './model.js';

const sample: Model[] = [
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


(async () => {
    console.log('Hi, this script will help you generate objection models');
    console.log('Here are the steps');
    console.log('1: Setup');
    console.log('2: Models creation (name, properties)');
    console.log('3: Models relations creation');
    console.log('4: You are done :)');
    const { path, extension } = await createSetup();
    // const models = await createRelations(await createModels());
    const models = sample;
    await generate(path, extension, models);
})();