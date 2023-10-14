import { UAParser } from "ua-parser-js";

export function detect() {
  const parserResults: ReturnType<UAParser["getResult"]> =
    // @ts-ignore
    UAParser().withFeatureCheck();

  return {
    browser: parserResults.browser.name
      ? {
          name: parserResults.browser.name,
          version: parserResults.browser.version,
        }
      : undefined,
    os: parserResults.os.name
      ? {
          name: parserResults.os.name,
          version: parserResults.os.version,
        }
      : undefined,
  };
}
