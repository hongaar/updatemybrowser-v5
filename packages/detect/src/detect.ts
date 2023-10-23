import { toSimpleVersionString } from "@updatemybrowser/core";
import { UAParser } from "ua-parser-js";

export type DetectedBrowser = {
  name: string;
  version: string | undefined;
};

export type DetectedOs = {
  name: string;
  version: string | undefined;
};

export type Detected = {
  browser: DetectedBrowser | undefined;
  os: DetectedOs | undefined;
};

export function detect(): Detected {
  const parserResults: ReturnType<UAParser["getResult"]> =
    // @ts-ignore
    UAParser().withFeatureCheck();

  return {
    browser: parserResults.browser.name
      ? {
          name: parserResults.browser.name,
          version: toSimpleVersionString(parserResults.browser.version),
        }
      : undefined,
    os: parserResults.os.name
      ? {
          name: parserResults.os.name,
          version: "5", // toSimpleVersionString(parserResults.os.version),
        }
      : undefined,
  };
}
