import {
  sanity,
  type Browser,
  type I18nText,
  type I18nUrl,
  type Release,
} from "@updatemybrowser/client";
import { updateFromMultiple } from "./version.js";
import {
  getWikipediaLanglinks,
  getWikipediaSummary,
  parseWikipediaUrl,
} from "./wikipedia.js";

function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && typeof value !== "undefined";
}

export async function runVersionUpdaterForAllReleases() {
  const client = sanity.getClient();
  const releases = await sanity.getReleases();

  for (const release of releases) {
    console.log(`Updating version for release: ${release._id}...`);

    const sources = release.versionSource
      .map(({ source, ...rest }) => {
        if (source === "caniuse" && rest.caniuse_agent) {
          return {
            source,
            agent: rest.caniuse_agent,
            contributeUsage: rest.caniuse_contribute_usage ?? true,
          };
        }

        return null;
      })
      .filter(notEmpty);

    const { version, usage } = await updateFromMultiple(sources);

    if (
      (typeof version !== "undefined" && version !== release.currentVersion) ||
      (typeof usage !== "undefined" && usage !== release.currentUsage)
    ) {
      const patch = client.patch(release._id);

      if (typeof version !== "undefined") {
        patch.set({ currentVersion: version });
      }

      if (typeof usage !== "undefined") {
        patch.set({ currentUsage: usage });
      }

      await patch
        .commit<Release>()
        .then((release) => {
          console.log("Updated to:", {
            version: release.currentVersion,
            usage: release.currentUsage,
          });
        })
        .catch((err) => {
          console.error("Oh no, the update failed: ", err.message);
        });
    } else {
      console.log("No changes");
    }
  }
}

export async function runWikipediaUpdaterForAllBrowsers() {
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
}

export async function runWikipediaUrlForAllBrowsers() {
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
}
