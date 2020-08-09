import prompts from "prompts";
export const abortablePrompts = async (promptOptions) => {
    const { value } = await prompts(promptOptions);
    if (value === undefined) {
        const { value: abort } = await prompts({
            type: "text",
            name: "value",
            message: "Do you want to abort ? y/N",
            initial: "n",
        });
        if (!abort || abort.toLowerCase() === "y") {
            process.exit(0);
        }
        return abortablePrompts(promptOptions);
    }
    return { value };
};
export const yesOrNoPrompts = async (message, initial) => {
    const { value } = await abortablePrompts({
        type: "text",
        name: "value",
        message,
        initial,
    });
    if (!value || value.toLowerCase() === "n") {
        return false;
    }
    if (value.toLowerCase() === "y") {
        return true;
    }
    return yesOrNoPrompts(message, initial);
};
//# sourceMappingURL=utils.js.map