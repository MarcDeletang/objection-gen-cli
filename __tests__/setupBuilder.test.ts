import prompts from "prompts";
import { createSetup, Extension } from "../lib/setupBuilder";
import { mockPromptsValue } from "./utils";

jest.mock("prompts");

const testPath = "path/to/folder";
const testExtension = {
  [Extension.Typescript]: true,
  [Extension.Javascript]: false,
};

describe("Testing setup", () => {
  test("Javascript extension and path", async () => {
    mockPromptsValue(prompts, testPath, testExtension[Extension.Javascript]);

    const { path, extension } = await createSetup();
    expect(path).toBe(testPath);
    expect(extension).toBe(Extension.Javascript);
  });

  test("Typescript extension and path", async () => {
    mockPromptsValue(prompts, testPath, testExtension[Extension.Typescript]);

    const { path, extension } = await createSetup();
    expect(path).toBe(testPath);
    expect(extension).toBe(Extension.Typescript);
  });
});
