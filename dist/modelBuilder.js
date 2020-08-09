import _ from "lodash";
import { abortablePrompts, yesOrNoPrompts } from "./utils.js";
const createCustomType = async () => abortablePrompts({
    type: "text",
    name: "value",
    message: "Enter your custom property type, it will be written as is",
});
const createType = async () => {
    const { value } = await abortablePrompts({
        type: "select",
        choices: [
            { title: "string", value: "string" },
            { title: "number", value: "number" },
            { title: "boolean", value: "boolean" },
            { title: "date", value: "date" },
            { title: "other", value: "other" },
        ],
        initial: 0,
        name: "value",
        message: "What is your property type ?",
    });
    if (value === "other") {
        return createCustomType();
    }
    return { value };
};
const createProperty = async () => {
    const { value: name } = await abortablePrompts({
        type: "text",
        name: "value",
        message: "What is your property name ?",
        validate: (v) => v.replace(/\s/g, "") ? true : "Your property must have a name",
        format: (v) => v.replace(/\s/g, ""),
    });
    const optional = await yesOrNoPrompts("Is this property optionnal ? y/N", "n");
    const { value: type } = await createType();
    return { name, type, optional };
};
const createProperties = async (properties = []) => {
    const { name, type, optional } = await createProperty();
    while (await yesOrNoPrompts("Do you want to add a property ? Y/n", "y")) {
        return createProperties([...properties, { name, type, optional }]);
    }
    return [...properties, { name, type, optional }];
};
export const createModels = async (models = []) => {
    console.log("Its model time !");
    const { value: name } = await abortablePrompts({
        type: "text",
        name: "value",
        message: "What is your model name ? (will be use as is in filename)",
        validate: (v) => v.replace(/\s/g, "") ? true : "Your model must have a name",
        format: (v) => v.replace(/\s/g, ""),
    });
    const { value: table } = await abortablePrompts({
        type: "text",
        name: "value",
        initial: _.snakeCase(name).toLowerCase(),
        message: "What is your table name ?",
    });
    console.log("Its properties time !");
    const properties = await createProperties();
    while (await yesOrNoPrompts("Do you want to create another model ? Y/n", "y")) {
        return createModels([
            ...models,
            { name, table, properties, relations: [] },
        ]);
    }
    return [...models, { name, table, properties, relations: [] }];
};
//# sourceMappingURL=modelBuilder.js.map