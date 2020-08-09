import { abortablePrompts } from "./utils.js";
export var Extension;
(function (Extension) {
    Extension["Typescript"] = ".ts";
    Extension["Javascript"] = ".js";
})(Extension || (Extension = {}));
const askPath = async () => {
    const { value: path } = await abortablePrompts({
        type: "text",
        name: "value",
        message: "What is your models folder ?",
        initial: ".",
        format: (v) => v.replace(/\s/g, ""),
    });
    return path;
};
const askExtension = async () => {
    const { value: extension } = await abortablePrompts({
        type: "toggle",
        name: "value",
        message: "Do you want to generate Typescript or Javascript ?",
        initial: true,
        active: "Typescript",
        inactive: "Javascript",
    });
    return extension ? Extension.Typescript : Extension.Javascript;
};
export const createSetup = async () => {
    console.log("Its setup time !");
    const path = await askPath();
    const extension = await askExtension();
    return { path, extension };
};
//# sourceMappingURL=setupBuilder.js.map