"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.yesOrNoPrompts = exports.abortablePrompts = exports.textPromptOption = void 0;
const prompts_1 = __importDefault(require("prompts"));
exports.textPromptOption = (message, options = {}) => ({
    type: "text",
    name: "value",
    message,
    ...options,
});
exports.abortablePrompts = async (promptOptions) => {
    const { value } = await prompts_1.default(promptOptions);
    if (value === undefined) {
        const { value: abort } = await prompts_1.default({
            type: "text",
            name: "value",
            message: "Do you want to abort ? y/N",
            initial: "n",
        });
        if (!abort || abort.toLowerCase() === "y") {
            return process.exit(0);
        }
        return exports.abortablePrompts(promptOptions);
    }
    return { value };
};
exports.yesOrNoPrompts = async (message, initial) => {
    const { value } = await exports.abortablePrompts({
        type: "text",
        name: "value",
        message,
        initial,
    });
    if (value.toLowerCase() === "n") {
        return false;
    }
    if (value.toLowerCase() === "y") {
        return true;
    }
    return exports.yesOrNoPrompts(message, initial);
};
