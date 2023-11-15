"use client";

import type { Language } from "@updatemybrowser/client";
import { useRouter } from "../Navigation";
import styles from "./languageSwitcher.module.scss";

type Props = {
  currentLanguage: string;
  languages: Language[];
};

export function List({ currentLanguage, languages }: Props) {
  const router = useRouter();

  return (
    <select
      className={styles.list}
      value={currentLanguage}
      onChange={(e) => {
        router.push(`/${e.target.value}`);
      }}
    >
      {languages.map((language) => (
        <option key={language.id} value={language.id}>
          {language.name}
        </option>
      ))}
    </select>
  );
}
