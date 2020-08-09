import { abortablePrompts } from "./utils";

export enum Extension {
  Typescript = ".ts",
  Javascript = ".js",
}

type Setup = {
  path: string;
  extension: Extension;
};

const askPath = async (): Promise<string> => {
  const { value: path } = await abortablePrompts<string>({
    type: "text",
    name: "value",
    message: "What is your models folder ?",
    initial: ".",
    format: (v) => v.replace(/\s/g, ""),
  });
  return path;
};

const askExtension = async (): Promise<Extension> => {
  const { value: extension } = await abortablePrompts<boolean>({
    type: "toggle",
    name: "value",
    message: "Do you want to generate Typescript or Javascript ?",
    initial: true,
    active: "Typescript",
    inactive: "Javascript",
  });
  return extension ? Extension.Typescript : Extension.Javascript;
};

export const createSetup = async (): Promise<Setup> => {
  console.log("Its setup time !");
  const path = await askPath();
  const extension = await askExtension();

  return { path, extension };
};
