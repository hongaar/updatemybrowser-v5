import "server-only";

import en from "./en";
import id from "./id";
import nl from "./nl";

const dictionaries = {
  en,
  nl,
  id,
};

export function getDictionary(language: string) {
  if (!(language in dictionaries)) {
    throw new Error(`Language file for "${language}" not found`);
  }

  return dictionaries[language as keyof typeof dictionaries];
}