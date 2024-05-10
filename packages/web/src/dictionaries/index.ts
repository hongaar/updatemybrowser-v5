import "server-only";

import { notFound } from "next/navigation";
import de from "./de";
import en from "./en";
import hi from "./hi";
import id from "./id";
import nl from "./nl";
import ru from "./ru";
import sw from "./sw";

const dictionaries = {
  de,
  en,
  hi,
  id,
  nl,
  ru,
  sw,
};

export function getDictionary(language: string) {
  if (!(language in dictionaries)) {
    console.warn(`Language file for "${language}" not found`);
    throw notFound();
  }

  return dictionaries[language as keyof typeof dictionaries];
}
