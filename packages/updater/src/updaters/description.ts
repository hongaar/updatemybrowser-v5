import { sanity, type Browser, type I18nString } from "@updatemybrowser/client";
import { deepEqual } from "@updatemybrowser/core";
import { command } from "bandersnatch";
import * as openai from "../openai.js";

const LENGTH_RESTRICTION = "Write 1 sentence with a maximum of 10 words.";

export const description = command("description")
  .argument("filter", {
    description: "Optionally filter by browser name",
    optional: true,
    type: "string",
  })
  .option("overrideEnglish", { type: "boolean" })
  .option("overrideTranslations", { type: "boolean" })
  .action(async ({ filter, overrideEnglish, overrideTranslations }) => {
    const client = sanity.getClient();
    const languageIds = await sanity.getLanguageIds();
    const browsers = (await sanity.getBrowsers()).filter((browser) => {
      if (!filter) {
        return true;
      }

      return browser.name.toLowerCase().includes(filter.toLowerCase());
    });

    for (const browser of browsers) {
      console.log(`Updating descriptions for browser: ${browser.name}...`);

      let englishDescription = browser.description?.find(
        (item) => item._key === "en",
      )?.value;

      if (overrideEnglish || !englishDescription) {
        console.log("Generating [en] description...");
        englishDescription = await openai.generate(
          `Summarize the main features of the "${browser.name}" web browser. \
          Do not use the term "${browser.name}" or "web browser". \
          ${LENGTH_RESTRICTION}`,
        );
      }

      const description: I18nString = [
        {
          _type: "internationalizedArrayStringValue",
          _key: "en",
          value: englishDescription,
        },
      ];

      for (const languageId of languageIds) {
        if (languageId === "en") {
          continue;
        }

        let translatedDescription = browser.description?.find(
          (item) => item._key === languageId,
        )?.value;

        if (overrideTranslations || !translatedDescription) {
          console.log(`Generating [${languageId}] translation...`);
          translatedDescription = await openai.translate(
            englishDescription,
            languageId,
            LENGTH_RESTRICTION,
          );
        }

        description.push({
          _type: "internationalizedArrayStringValue",
          _key: languageId,
          value: translatedDescription,
        });
      }

      const patch = client.patch(browser._id);

      if (!deepEqual(browser.description, description)) {
        await patch
          .set({ description })
          .commit<Browser>()
          .then(() => {
            console.log("Updated");
          })
          .catch((err) => {
            console.error("Oh no, the update failed: ", err.message);
          });
      } else {
        console.log("No changes");
      }
    }
  });
