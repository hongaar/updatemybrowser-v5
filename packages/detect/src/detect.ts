import { toSimpleVersionString } from "@updatemybrowser/core";
import { UAParser } from "ua-parser-js";

export function detect() {
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
          version: toSimpleVersionString(parserResults.os.version),
        }
      : undefined,
  };
}
