import { sanity, type Browser, type I18nText } from "@updatemybrowser/client";
import { command } from "bandersnatch";
import { getWikipediaSummary, parseWikipediaUrl } from "../wikipedia.js";

export const summary = command("summary").action(async () => {
  const client = sanity.getClient();
  const browsers = await sanity.getBrowsers();

  for (const browser of browsers) {
    console.log(`Updating wikipedia summary for browser: ${browser.name}...`);

    const patch = client.patch(browser._id);
    const summary: I18nText = [];

    const urls = browser.wikipediaUrl || [];

    for (const { _key: language, value: url } of urls) {
      if (!url) {
        continue;
      }

      const wikipediaResult = await getWikipediaSummary({
        language,
        title: parseWikipediaUrl(url).title,
      });

      summary.push({
        _type: "internationalizedArrayTextValue",
        _key: language,
        value: wikipediaResult.extract,
      });
    }

    await patch
      .set({ summary })
      .commit<Browser>()
      .then(() => {
        console.log("Updated");
      })
      .catch((err) => {
        console.error("Oh no, the update failed: ", err.message);
      });
  }
});
