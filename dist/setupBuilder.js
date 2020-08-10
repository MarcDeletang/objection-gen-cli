"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSetup = exports.Extension = void 0;
const utils_1 = require("./utils");
var Extension;
(function (Extension) {
    Extension["Typescript"] = ".ts";
    Extension["Javascript"] = ".js";
})(Extension = exports.Extension || (exports.Extension = {}));
const askPath = async () => {
    const { value: path } = await utils_1.abortablePrompts(utils_1.textPromptOption("What is your models folder ?", {
        type: "text",
        name: "value",
        initial: ".",
        format: (v) => v.replace(/\s/g, ""),
    }));
    return path;
};
const askExtension = async () => {
    const { value: extension } = await utils_1.abortablePrompts({
        type: "toggle",
        name: "value",
        message: "Do you want to generate Typescript or Javascript ?",
        initial: true,
        active: "Typescript",
        inactive: "Javascript",
    });
    return extension ? Extension.Typescript : Extension.Javascript;
};
exports.createSetup = async () => {
    console.log("Its setup time !");
    const path = await askPath();
    const extension = await askExtension();
    return { path, extension };
};
