import { browsers, languages, oses, releases } from "./cached/index.js";
import * as sanity from "./sanity.js";

export { defaultLanguage, sanityConfig } from "./config.js";

type FromCacheOption = {
  fromCache?: boolean;
};

type FlattenOption = {
  flatten?: boolean;
};

let globalFromCache = true;

export function disableCache() {
  globalFromCache = false;
}

export function enableCache() {
  globalFromCache = true;
}

export async function getLanguages({
  fromCache = globalFromCache,
}: FromCacheOption = {}) {
  const results = fromCache ? languages : await sanity.getLanguages();

  return results;
}

export async function getLanguageIds({
  fromCache = true,
}: FromCacheOption = {}) {
  return (await getLanguages({ fromCache })).map((language) => language.id);
}

export async function getOses({ fromCache = true }: FromCacheOption = {}) {
  const results = fromCache
    ? oses
    : await sanity.getOses({ language: await sanity.getLanguageIds() });

  return results;
}

export async function getBrowsers({ fromCache = true }: FromCacheOption = {}) {
  const results = fromCache
    ? browsers
    : await sanity.getBrowsers({ language: await sanity.getLanguageIds() });

  return results;
}

export async function getReleases({
  fromCache = true,
  flatten = true,
}: FromCacheOption & FlattenOption) {
  const results = fromCache
    ? releases
    : await sanity.getReleases({ language: await sanity.getLanguageIds() });

  if (flatten) {
    const osResults = await getOses({ fromCache });
    const browserResults = await getBrowsers({ fromCache });

    return results.map((release) => {
      return {
        ...release,
        browser: browserResults.find(
          (item) => release.browser._ref === item._id,
        ),
        oses: release.oses.map((os) =>
          osResults.find((item) => os._ref === item._id),
        ),
      };
    });
  }

  return results;
}
