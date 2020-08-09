[![Known Vulnerabilities](https://snyk.io/test/github/MarcDeletang/objection-gen-cli/badge.svg?targetFile=package.json)](https://snyk.io/test/github/MarcDeletang/objection-gen-cli?targetFile=package.json)
[![Maintainability](https://api.codeclimate.com/v1/badges/5feb4d0abeeb8a8b319e/maintainability)](https://codeclimate.com/github/MarcDeletang/objection-gen-cli/maintainability)
[![codecov](https://codecov.io/gh/MarcDeletang/objection-gen-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/MarcDeletang/objection-gen-cli)

# objection-gen-cli

Objection model generator

This package allow you to generate objection model class.

<details>
  <summary>Like this one:</summary>
  
```
import { Model } from 'objection';

export class User extends Model {
    public id: number;
    public firstName?: string;

    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        const { Product } = require('./product');

        return {
            children: {
                relation: Model.HasManyRelation,
                modelClass: User,
                join: {
                    from: 'users.id',
                    to: 'users.parent_id'
                }
            },
            parent: {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'users.parent_id',
                    to: 'users.id'
                }
            },
            userProducts: {
                relation: Model.ManyToManyRelation,
                modelClass: Product,
                join: {
                    from: 'users.id',
                    through: {
                        from: 'user_product.user_id',
                        to: 'user_product.product_id'
                    },
                    to: 'products.id'
                }
            },
        };
    }

}
```
</details>

## Install as dev dependency:

```
yarn add -D objection-gen-cli
```

Or:

```
npm install -D objection-gen-cli
```

## Usage:

```
npx objection-cli
```

Or (after install):

```
yarn run objection-cli
```

## How does it work ?

This script will generate a prompt that will guide you in building your models.

Note: The models generated should have a readable look. I dont plan to allow to configure the syntax (quote, commas ...). Your linter should take care of that.

## Extend it:

All main methods should be exposed so you can use them, but at the moment it's not really customisable.


## Things left to do:

- Testing
- Shortcut for id field generation
- Model update during prompts
- Add cli argument to avoid questions (folder name, extention, id ...)
- Add relations to properties (need to resolve circular deps first)
- Load existing models from the folder to allow relations to them (might be tricky)
- Generate a basic knex migration file (might be tricky)

If you have any idea of things you would like to add, feel free to fill an issue !

I hope you enjoy it :)

## Other

[Objection relations docs](https://vincit.github.io/objection.js/guide/relations.html)

Thanks a lot for making objection guys, it's an awesome tool !
