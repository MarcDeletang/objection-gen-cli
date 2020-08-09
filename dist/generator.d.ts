import { Model } from "./model";
import { Extension } from "./setupBuilder";
export declare const generate: (path: string, extension: Extension, models: Model[]) => Promise<void[] | undefined>;
