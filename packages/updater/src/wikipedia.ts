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
  action: "parse";
  page?: string;
  pageId?: string;
  prop: "langlinks" | "parsetree";
  format?: "json" | "xml";
  lllimit?: string;
};

async function makeActionRequest({
  language,
  action,
  page,
  pageId,
  prop,
  format,
  lllimit,
}: MakeActionRequestParams) {
  const searchParams = new URLSearchParams();
  searchParams.set("action", action);
  searchParams.set("prop", prop);
  lllimit && searchParams.set("lllimit", lllimit || "500");
  page && searchParams.set("page", page);
  pageId && searchParams.set("pageid", pageId);
  format && searchParams.set("format", format);

  const url = `${baseActionUrl(language)}?${searchParams.toString()}`;

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

type GetWikipediaLanglinksParams = {
  title: string;
};

type WikipediaLangLinks = {
  warnings?: any;
  parse: {
    title: string;
    pageid: number;
    langlinks: {
      lang: string;
      url: string;
      langname: string;
      autonym: string;
      "*": string;
    }[];
  };
};

export async function getWikipediaLanglinks({
  title,
}: GetWikipediaLanglinksParams): Promise<WikipediaLangLinks> {
  return makeActionRequest({
    language: "en",
    action: "parse",
    page: title,
    format: "json",
    prop: "langlinks",
  }).then((response) => response.json());
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
