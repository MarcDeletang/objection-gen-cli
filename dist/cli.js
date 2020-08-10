#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelBuilder_1 = require("./modelBuilder");
const setupBuilder_1 = require("./setupBuilder");
const relationBuilder_1 = require("./relationBuilder");
const generator_1 = require("./generator");
(async () => {
    console.log("Hi, this script will help you generate objection models");
    console.log("Here are the steps");
    console.log("1: Setup");
    console.log("2: Models creation (name, properties)");
    console.log("3: Models relations creation");
    console.log("4: You are done :)");
    const { path, extension } = await setupBuilder_1.createSetup();
    const models = await relationBuilder_1.createRelations(await modelBuilder_1.createModels());
    await generator_1.generate(path, extension, models);
})();
