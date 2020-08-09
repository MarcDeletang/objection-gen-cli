#! /usr/bin/env node
import { createModels } from "./modelBuilder";
import { createSetup } from "./setupBuilder";
import { createRelations } from "./relationBuilder";
import { generate } from "./generator";

(async () => {
  console.log("Hi, this script will help you generate objection models");
  console.log("Here are the steps");
  console.log("1: Setup");
  console.log("2: Models creation (name, properties)");
  console.log("3: Models relations creation");
  console.log("4: You are done :)");
  const { path, extension } = await createSetup();
  const models = await createRelations(await createModels());
  await generate(path, extension, models);
})();
