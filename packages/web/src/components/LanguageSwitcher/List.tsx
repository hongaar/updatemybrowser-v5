"use client";

import type { SanityLanguage } from "@updatemybrowser/core";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./languageSwitcher.module.scss";

type Props = {
  loadingText: string;
  currentLanguage: string;
  languages: SanityLanguage[];
};

export function List({ loadingText, currentLanguage, languages }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <select
      className={styles.list}
      value={currentLanguage}
      onChange={(e) => {
        setIsLoading(true);
        router.push(`/${e.target.value}`);
      }}
    >
      {isLoading ? (
        <option>{loadingText}...</option>
      ) : (
        languages.map((language) => (
          <option key={language.id} value={language.id}>
            {language.name}
          </option>
        ))
      )}
    </select>
  );
}
