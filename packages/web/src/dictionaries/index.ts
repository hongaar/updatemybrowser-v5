import "server-only";

import de from "./de";
import en from "./en";
import id from "./id";
import nl from "./nl";

const dictionaries = {
  de,
  en,
  id,
  nl,
};

export function getDictionary(language: string) {
  if (!(language in dictionaries)) {
    throw new Error(`Language file for "${language}" not found`);
  }

  return dictionaries[language as keyof typeof dictionaries];
}
