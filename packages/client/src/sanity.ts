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
      perspective: "published",
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

export async function getDocuments<T extends DocType>(
  type: T,
  expandImageFields: string[] = [],
) {
  return await getClient().fetch<Docs[T][]>(`*[_type == "${type}"]{
    ${["..."]
      .concat(
        expandImageFields.map(
          (field) => `defined(${field}) => {${field}{..., asset->{...}}}`,
        ),
      )
      .join(",")}
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

export async function getOses() {
  return getDocuments(DocType.OS);
}

export async function getBrowsers() {
  return getDocuments(DocType.Browser, ["logo", "screenshots[]"]);
}

export async function getReleases() {
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

export async function getFeatureCategories() {
  return getDocuments(DocType.FeatureCategory);
}

export async function getFeatures() {
  return getDocuments(DocType.Feature);
}
