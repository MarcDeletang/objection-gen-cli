import { mocked } from "ts-jest/utils";

export const mockPromptsValue = (prompts: any, ...values: any[]) => {
  const mockedPrompts = mocked(prompts, false);
  values.forEach((value) => {
    mockedPrompts.mockImplementationOnce(() => {
      return Promise.resolve({ value });
    });
  });
};
