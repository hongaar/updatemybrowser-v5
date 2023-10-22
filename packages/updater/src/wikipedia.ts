import fetch from "cross-fetch";

const headers = {
  "User-Agent": "@updatemybrowser/updater/v1 (joram@vandenboezem.nl)",
};

function baseRestUrl(language: string) {
  return `https://${language}.wikipedia.org/api/rest_v1/`;
}

function baseActionUrl(language: string) {
  return `https://${language}.wikipedia.org/w/api.php`;
}

type MakeRestRequestParams = {
  language: string;
  endpoint: string;
};

async function makeRestRequest({ language, endpoint }: MakeRestRequestParams) {
  const url = `${baseRestUrl(language)}${endpoint}`;

  return fetch(url, { headers });
}

type MakeActionRequestParams = {
  language: string;
  action: string;
  format: string;
  prop: string;
  pageId: string;
};

async function makeActionRequest({
  language,
  action,
  format,
  prop,
  pageId,
}: MakeActionRequestParams) {
  const url = `${baseActionUrl(
    language,
  )}?action=${action}&format=${format}&prop=${prop}&pageid=${pageId}`;

  return fetch(url, { headers });
}

export function parseWikipediaUrl(url: string) {
  const matches = url.match(/https:\/\/([a-z]+)\.wikipedia\.org\/wiki\/(.+)/);

  if (!matches || matches.length !== 3) {
    throw new Error(`Invalid Wikipedia URL: ${url}`);
  }

  return {
    language: matches[1] as string,
    title: matches[2] as string,
  };
}

type GetWikipediaPageParams = {
  language: string;
  title: string;
};

export async function getWikipediaPageHtml({
  language,
  title,
}: GetWikipediaPageParams) {
  return makeRestRequest({
    language,
    endpoint: `page/html/${title}`,
  }).then((response) => response.text());
}

export type WikipediaSummary = {
  type: string;
  title: string;
  displaytitle: string;
  namespace: { id: number; text: string };
  wikibase_item: string;
  titles: {
    canonical: string;
    normalized: string;
    display: string;
  };
  pageid: number;
  thumbnail: {
    source: string;
    width: number;
    height: number;
  };
  originalimage: {
    source: string;
    width: number;
    height: number;
  };
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description: string;
  description_source: string;
  content_urls: { desktop: {}; mobile: {} };
  extract: string;
  extract_html: string;
};

export async function getWikipediaSummary({
  language,
  title,
}: GetWikipediaPageParams): Promise<WikipediaSummary> {
  return makeRestRequest({
    language,
    endpoint: `page/summary/${title}`,
  }).then((response) => response.json());
}

type GetWikipediaParsetreeParams = {
  language: string;
  pageId: string;
};

export async function getWikipediaParsetree({
  language,
  pageId,
}: GetWikipediaParsetreeParams) {
  return makeActionRequest({
    language,
    action: "parse",
    format: "json",
    prop: "parsetree",
    pageId,
  });
}
