import { SanityClient, createClient } from "@sanity/client";
import { sanityConfig } from "./config.js";
import { DocType, type Article, type Docs, type Release } from "./schema.js";

const USE_CDN = false;

const { dataset, projectId } = sanityConfig;
const apiVersion = "2023-05-03";

let client: SanityClient;

export function getClient({ token = process.env["SANITY_TOKEN"] } = {}) {
  return (
    client ??
    (client = createClient({
      ...(token ? { token } : {}),
      projectId,
      dataset,
      apiVersion, // https://www.sanity.io/docs/api-versioning
      useCdn: USE_CDN,
    }))
  );
}

export function enableDrafts() {
  return (client = getClient().withConfig({
    useCdn: false,
    perspective:
      process.env["NODE_ENV"] === "development" ? "previewDrafts" : "published",
  }));
}

type LanguageOptions = {
  language: string | string[];
};

type I18nFieldsOptions = LanguageOptions & {
  i18nFields: string[];
};

function compileI18nFields({ language, i18nFields }: I18nFieldsOptions) {
  return i18nFields.map(
    (field) =>
      `"${field}": {${(Array.isArray(language) ? language : [language])
        .map(
          (language) =>
            `"${language}": ${field}[_key == "${language}"][0].value`,
        )
        .join(",\n")}}`,
  );
}

export async function getDocuments<T extends DocType>(
  type: T,
  languageOptions?: I18nFieldsOptions,
) {
  const props = ["..."]
    .concat(languageOptions ? compileI18nFields(languageOptions) : [])
    .join(",\n");

  return await getClient().fetch<Docs[T][]>(`*[_type == "${type}"]{
    ${props}
  }`);
}

export async function getLanguages() {
  return (await getDocuments(DocType.Language)).sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}

export async function getLanguageIds() {
  return (await getLanguages()).map((language) => language.id);
}

export async function getOses({ language }: LanguageOptions) {
  return getDocuments(DocType.OS, {
    language,
    i18nFields: ["description"],
  });
}

export async function getBrowsers({ language }: LanguageOptions) {
  return getDocuments(DocType.Browser, {
    language,
    i18nFields: ["description"],
  });
}

export async function getReleases({}: LanguageOptions = {}) {
  return await getClient().fetch<Release[]>(
    `*[_type == "release"] | order(currentUsage desc)`,
  );
}

export async function getArticles({ language }: LanguageOptions) {
  return await getClient().fetch<Article[]>(
    `*[_type == "article" && language in $language]{
  ...,
  "translationOf": *[_type == "translation.metadata" && references(^._id)]{
    "translation": translations[_key == "en"][0].value
  }[0].translation
}`,
    {
      language: Array.isArray(language) ? language : [language],
    },
  );
}
