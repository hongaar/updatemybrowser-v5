import * as cached from "./cached/index.js";
import * as sanity from "./sanity.js";
import type {
  BrowserWithFlatReleases,
  ReleaseExpanded,
  ReleaseFlatExpanded,
} from "./schema.js";

export { defaultLanguage, sanityConfig } from "./config.js";
export type * from "./schema.js";

type useCacheOption = {
  useCache?: boolean;
};

const DEFAULT_USE_CACHE = true;

export async function getLanguages({
  useCache = DEFAULT_USE_CACHE,
}: useCacheOption = {}) {
  return useCache ? cached.languages : await sanity.getLanguages();
}

export async function getLanguageIds({
  useCache = DEFAULT_USE_CACHE,
}: useCacheOption = {}) {
  return (await getLanguages({ useCache })).map((language) => language.id);
}

export async function getLanguage(
  languageId: string,
  { useCache = DEFAULT_USE_CACHE }: useCacheOption = {},
) {
  return (await getLanguages({ useCache })).find(
    (language) => language.id === languageId,
  );
}

export async function getOses({
  useCache = DEFAULT_USE_CACHE,
}: useCacheOption = {}) {
  const oses = useCache
    ? cached.oses
    : await sanity.getOses({ language: await sanity.getLanguageIds() });

  return oses;
}

export async function getBrowsers({
  useCache = DEFAULT_USE_CACHE,
}: useCacheOption = {}) {
  return useCache
    ? cached.browsers
    : await sanity.getBrowsers({ language: await sanity.getLanguageIds() });
}

export async function getBrowsersWithFlatReleases({
  useCache = DEFAULT_USE_CACHE,
}: useCacheOption = {}) {
  const results = await getBrowsers({ useCache });
  const releases = await getReleasesFlatExpanded({ useCache });

  const expandedResults = results.map((browser) => {
    return {
      ...browser,
      releases: releases.filter((item) => browser._id === item.browser._id),
    };
  }) as BrowserWithFlatReleases[];

  return expandedResults;
}

export async function getReleases({
  useCache = DEFAULT_USE_CACHE,
}: useCacheOption = {}) {
  return useCache
    ? cached.releases
    : await sanity.getReleases({ language: await sanity.getLanguageIds() });
}

export async function getReleasesExpanded({
  useCache = DEFAULT_USE_CACHE,
}: useCacheOption = {}) {
  const results = await getReleases({ useCache });
  const osResults = await getOses({ useCache });
  const browserResults = await getBrowsers({ useCache });

  const expandedResults = results.map((release) => {
    return {
      ...release,
      browser: browserResults.find((item) => release.browser._ref === item._id),
      oses: release.oses.map(({ os, ...rest }) => ({
        ...rest,
        os: osResults.find((item) => os._ref === item._id),
      })),
    };
  }) as ReleaseExpanded[];

  return expandedResults;
}

export async function getReleasesFlatExpanded({
  useCache = DEFAULT_USE_CACHE,
}: useCacheOption = {}) {
  const results = await getReleases({ useCache });
  const osResults = await getOses({ useCache });
  const browserResults = await getBrowsers({ useCache });

  const expandedResults = results.flatMap((release) => {
    return release.oses.map(({ os, ...rest }) => {
      return {
        ...release,
        browser: browserResults.find(
          (item) => release.browser._ref === item._id,
        ),
        os: {
          ...rest,
          os: osResults.find((item) => os._ref === item._id),
        },
        oses: undefined,
      };
    });
  }) as ReleaseFlatExpanded[];

  return expandedResults;
}
