import * as documents from "./documents/index.js";
import * as objects from "./objects/index.js";

export const schemaTypes = [
  ...Object.values(documents),
  ...Object.values(objects),
];
