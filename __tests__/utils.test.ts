import prompts from "prompts";

import { abortablePrompts, yesOrNoPrompts } from "../lib/utils";
import { mockPromptsValue } from "./utils";

jest.mock("prompts");

const setProperty = (object: any, property: string, value: any) => {
  const originalProperty = Object.getOwnPropertyDescriptor(object, property);
  Object.defineProperty(object, property, { value });
  return originalProperty;
};

describe("Testing utils/abortPrompts", () => {
  test("Abort prompt should not abord and return value", async () => {
    const value = "test";
    mockPromptsValue(prompts, value);

    const { value: res } = await abortablePrompts({
      type: "text",
      name: "value",
      message: "I should not exit",
    });
    expect(res).toEqual(value);
  });

  test("Abort prompt should not abort and return value on multiple cancel with 'no'", async () => {
    const value = "test";
    mockPromptsValue(prompts, undefined, "n", undefined, "n", value);

    const { value: res } = await abortablePrompts({
      type: "text",
      name: "value",
      message: "I should not exit",
    });
    expect(res).toEqual(value);
  });

  test("Abort prompt should not abort and return value when abort response is not yes", async () => {
    const value = "test";
    mockPromptsValue(prompts, undefined, "abcd", value);

    const { value: res } = await abortablePrompts({
      type: "text",
      name: "value",
      message: "I should not exit",
    });
    expect(res).toEqual(value);
  });

  test("Abort prompt should abort on yes", async () => {
    mockPromptsValue(prompts, undefined, "y");
    const mockExit = jest.fn();
    setProperty(process, "exit", mockExit);

    await abortablePrompts({
      type: "text",
      name: "value",
      message: "I should exit",
    });

    expect(mockExit).toHaveBeenCalledWith(0);
  });

  test("Abort prompt should abort on double cancel", async () => {
    mockPromptsValue(prompts, undefined, undefined);
    const mockExit = jest.fn();
    setProperty(process, "exit", mockExit);

    await abortablePrompts({
      type: "text",
      name: "value",
      message: "I should exit",
    });

    expect(mockExit).toHaveBeenCalledWith(0);
  });
});

describe("Testing utils/yesOrNoPrompts", () => {
  test("yesOrNoPrompts should return true on 'y'", async () => {
    mockPromptsValue(prompts, "y");

    const res = await yesOrNoPrompts("I should return yes", "y");
    expect(res).toEqual(true);
  });

  test("yesOrNoPrompts should return true on 'Y'", async () => {
    mockPromptsValue(prompts, "Y");

    const res = await yesOrNoPrompts("I should return yes", "y");
    expect(res).toEqual(true);
  });

  test("yesOrNoPrompts should return false on 'n'", async () => {
    mockPromptsValue(prompts, "n");

    const res = await yesOrNoPrompts("I should return no", "y");
    expect(res).toEqual(false);
  });

  test("yesOrNoPrompts should return false on 'N'", async () => {
    mockPromptsValue(prompts, "N");

    const res = await yesOrNoPrompts("I should return no", "y");
    expect(res).toEqual(false);
  });

  test("yesOrNoPrompts should ask again and return false on 'n'", async () => {
    mockPromptsValue(prompts, "fail", "n");

    const res = await yesOrNoPrompts("I should return no", "y");
    expect(res).toEqual(false);
  });

  test("yesOrNoPrompts should ask again and return false on 'y'", async () => {
    mockPromptsValue(prompts, "fail", "y");

    const res = await yesOrNoPrompts("I should return yes", "y");
    expect(res).toEqual(true);
  });
});
