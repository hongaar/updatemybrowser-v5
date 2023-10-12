import { UAParser } from "ua-parser-js";

export function detect() {
  const parser = new UAParser();
  const parserResults = parser.getResult();

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
