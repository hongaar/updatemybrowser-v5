import { sanity, type I18nString } from "@updatemybrowser/client";
import { deepEqual } from "@updatemybrowser/core";
import { command } from "bandersnatch";
import * as openai from "../openai.js";

export const features = command("features")
  .option("overrideTranslations", { type: "boolean" })
  .action(async ({ overrideTranslations }) => {
    const client = sanity.getClient();
    const languageIds = await sanity.getLanguageIds();
    const featureCategories = await sanity.getFeatureCategories();
    const features = await sanity.getFeatures();
    const docs = [...featureCategories, ...features];

    for (const doc of docs) {
      for (const prop of ["name", "description"] as const) {
        console.log(`Updating ${prop} of ${doc._type}: ${doc.slug.current}...`);

        let english = doc[prop]?.find((item) => item._key === "en")?.value;

        if (!english) {
          console.log(`English ${prop} not set, skipping`);
          continue;
        }

        const value: I18nString = [
          {
            _type: "internationalizedArrayStringValue",
            _key: "en",
            value: english,
          },
        ];

        for (const languageId of languageIds) {
          if (languageId === "en") {
            continue;
          }

          let translation = doc[prop]?.find((item) => item._key === languageId)
            ?.value;

          if (overrideTranslations || !translation) {
            console.log(`Generating [${languageId}] translation...`);
            translation = await openai.translate(english, languageId);
          }

          value.push({
            _type: "internationalizedArrayStringValue",
            _key: languageId,
            value: translation,
          });
        }

        const patch = client.patch(doc._id);

        if (!deepEqual(doc[prop], value)) {
          await patch
            .set({ [prop]: value })
            .commit()
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
    }
  });
