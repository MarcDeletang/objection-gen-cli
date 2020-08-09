import { PromptObject } from "prompts";
export declare type PromptResponse<T> = {
    value: T;
};
export declare const textPromptOption: (message: string, options?: Partial<PromptObject>) => PromptObject;
export declare const abortablePrompts: <T>(promptOptions: PromptObject) => Promise<PromptResponse<T>>;
declare type YesOrNoInitialValue = "y" | "n";
export declare const yesOrNoPrompts: (message: string, initial: YesOrNoInitialValue) => Promise<boolean>;
export {};
