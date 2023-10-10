import {
  SanityDocType,
  defaultLanguage,
  sanityConfig,
  type SanityDocs,
} from "@updatemybrowser/core";
import { createClient } from "next-sanity";

const { dataset, projectId } = sanityConfig;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03";

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: process.env.NODE_ENV === "production", // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
});

type GetDocumentOptions = {
  language?: string;
  i18nFields?: string[];
};

export async function getDocuments<T extends SanityDocType>(
  type: T,
  { language = defaultLanguage, i18nFields = [] }: GetDocumentOptions = {},
) {
  const props = ["..."]
    .concat(
      i18nFields.map(
        (field) => `"${field}": ${field}[_key == "${language}"][0].value`,
      ),
    )
    .join(",\n");
  return await client.fetch<SanityDocs[T][]>(`*[_type == "${type}"]{
    ${props}
  }`);
}

export async function getLanguages() {
  return (await getDocuments(SanityDocType.Language)).sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}

export async function getBrowsers({ language }: { language?: string } = {}) {
  return getDocuments(SanityDocType.Browser, {
    language,
    i18nFields: ["description"],
  });
}
