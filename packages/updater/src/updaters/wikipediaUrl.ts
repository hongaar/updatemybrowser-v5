import { sanity, type Browser, type I18nUrl } from "@updatemybrowser/client";
import { command } from "bandersnatch";
import { getWikipediaLanglinks, parseWikipediaUrl } from "../wikipedia.js";

export const wikipediaUrl = command("wikipediaUrl").action(async () => {
  const client = sanity.getClient();
  const languageIds = await sanity.getLanguageIds();
  const browsers = await sanity.getBrowsers();

  for (const browser of browsers) {
    console.log(`Updating Wikipedia URLs for browser: ${browser.name}...`);

    const englishUrl = browser.wikipediaUrl?.find((item) => item._key === "en")
      ?.value;

    if (englishUrl) {
      const patch = client.patch(browser._id);
      const wikipediaUrl: I18nUrl = [
        {
          _type: "internationalizedArrayUrlValue",
          _key: "en",
          value: englishUrl,
        },
      ];

      const langlinks = await getWikipediaLanglinks({
        title: parseWikipediaUrl(englishUrl).title,
      });

      for (const languageId of languageIds) {
        const langlink = langlinks.parse.langlinks.find(
          (item) => item.lang === languageId,
        );

        if (langlink) {
          wikipediaUrl.push({
            _type: "internationalizedArrayUrlValue",
            _key: languageId,
            value: langlink.url,
          });
        }
      }

      await patch
        .set({ wikipediaUrl })
        .commit<Browser>()
        .then(() => {
          console.log("Updated");
        })
        .catch((err) => {
          console.error("Oh no, the update failed: ", err.message);
        });
    } else {
      console.log("No English Wikipedia URL found");
    }
  }
});
