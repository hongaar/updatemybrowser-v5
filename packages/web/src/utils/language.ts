import { defaultLanguage } from "@updatemybrowser/core";
import { getLanguages } from "./sanity";

export async function getLanguageIds() {
  return (await getLanguages()).map((language) => language.id);
}

export async function getDefaultLanguageId() {
  return defaultLanguage;
}
