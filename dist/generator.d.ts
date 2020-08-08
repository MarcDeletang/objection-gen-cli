import { Model } from './model.js';
import { Extension } from './setupBuilder.js';
export declare const generate: (path: string, extension: Extension, models: Model[]) => Promise<void[] | undefined>;
