"use client";

import type { SanityLanguage } from "@updatemybrowser/core";
import { useState } from "react";

export default function List({
  loadingText,
  currentLanguage,
  languages,
}: {
  loadingText: string;
  currentLanguage: string;
  languages: SanityLanguage[];
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <select
      value={currentLanguage}
      onChange={(e) => {
        setIsLoading(true);
        window.location.href = `/${e.target.value}`;
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
