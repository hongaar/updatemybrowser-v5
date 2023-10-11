"use client";

import type { SanityLanguage } from "@updatemybrowser/core";
import { useRouter } from "next/navigation";
import styles from "./languageSwitcher.module.scss";

type Props = {
  currentLanguage: string;
  languages: SanityLanguage[];
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
