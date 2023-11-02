import { sanity } from "@updatemybrowser/client";
import englishDict from "@updatemybrowser/web/src/dictionaries/en.js";
import { command } from "bandersnatch";
import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { translate } from "../openai.js";

export const dict = command("dict")
  .argument("filter", {
    description: "Optionally filter by key",
    optional: true,
    type: "string",
  })
  .option("overrideTranslations", { type: "boolean" })
  .action(async ({ filter, overrideTranslations }) => {
    const languageIds = await sanity.getLanguageIds();

    for (const languageId of languageIds) {
      if (languageId === "en") {
        continue;
      }

      console.log(`Updating [${languageId}] dictionary...`);

      let dict: Record<string, string> = {};
      try {
        dict = (
          await import(`@updatemybrowser/web/src/dictionaries/${languageId}.js`)
        ).default as Record<string, string>;
      } catch (err) {}

      for (const [key, english] of Object.entries(englishDict).filter(
        ([key]) => (filter ? key === filter : true),
      )) {
        if (!(key in dict) || overrideTranslations) {
          console.log(`Translate "${english}" to [${languageId}]...`);
          dict[key] = await translate(english, languageId);
        }
      }

      const dictPath = resolve(
        dirname(fileURLToPath(import.meta.url)),
        "..",
        "..",
        "..",
        "web",
        "src",
        "dictionaries",
        `${languageId}.ts`,
      );
      const contents = `import type { Dict } from "./en.js";

const dict: Dict = ${JSON.stringify(dict, null, 2)};

export default dict;
`;
      console.log(`Writing ${languageId} dictionary to ${dictPath}...`);
      await writeFile(dictPath, contents, "utf-8");
    }
  });
