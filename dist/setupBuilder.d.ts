export declare enum Extension {
    Typescript = ".ts",
    Javascript = ".js"
}
declare type Setup = {
    path: string;
    extension: Extension;
};
export declare const createSetup: () => Promise<Setup>;
export {};
