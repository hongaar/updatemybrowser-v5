import "dotenv/config";
// @ts-ignore
import { outputFile } from "fs-extra/esm";
import { join } from "node:path";
import {
  enableDrafts,
  getBrowsers,
  getLanguages,
  getOses,
  getReleases,
} from "../src/sanity.js";

const currentDirectory = new URL(import.meta.url).pathname
  .split("/")
  .slice(0, -1)
  .join("/");

const banner = `// This file is generated by scripts/cache-docs.ts, do not edit it manually`;

async function createCache(
  type: string,
  tsType: string,
  language: string[],
  fn: (args: { language: string[] }) => Promise<unknown>,
) {
  console.log(`Generating ${type}.ts`);

  const results = await fn({ language });

  const destPath = join(currentDirectory, "..", "src", "cached", `${type}.ts`);

  await outputFile(
    destPath,
    [
      banner,
      `import type { ${tsType} } from "../schema.js";`,
      "",
      `export const ${type}: ${tsType}[] = ${JSON.stringify(
        results,
        undefined,
        2,
      )}`,
    ].join("\n"),
  );
}

async function createDocsCache() {
  const languages = (await getLanguages()).map((language) => language.id);

  if (process.env["NODE_ENV"] === "development") {
    enableDrafts();
  }

  await createCache("languages", "SanityLanguage", languages, getLanguages);
  await createCache("oses", "SanityOS", languages, getOses);
  await createCache("browsers", "SanityBrowser", languages, getBrowsers);
  await createCache("releases", "SanityRelease", languages, getReleases);
}

createDocsCache();
