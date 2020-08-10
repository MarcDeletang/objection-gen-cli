import prompts, { PromptObject } from "prompts";

export type PromptResponse<T> = {
  value: T;
};

export const textPromptOption = (
  message: string,
  options: Partial<PromptObject> = {}
): PromptObject => ({
  type: "text",
  name: "value",
  message,
  ...options,
});

export const abortablePrompts = async <T>(
  promptOptions: PromptObject
): Promise<PromptResponse<T>> => {
  const { value } = await prompts(promptOptions);

  if (value === undefined) {
    const { value: abort } = await prompts({
      type: "text",
      name: "value",
      message: "Do you want to abort ? y/N",
      initial: "n",
    });
    if (!abort || abort.toLowerCase() === "y") {
      return process.exit(0);
    }
    return abortablePrompts(promptOptions);
  }
  return { value };
};

type YesOrNoInitialValue = "y" | "n";

export const yesOrNoPrompts = async (
  message: string,
  initial: YesOrNoInitialValue
): Promise<boolean> => {
  const { value } = await abortablePrompts<string>({
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
  return yesOrNoPrompts(message, initial);
};
