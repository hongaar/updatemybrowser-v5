"use client";

import { useEffect, useState } from "react";
import type { Dict } from "../../dictionaries/en";
import { Spinner } from "../Spinner";

type Props = {
  language: string;
  dict: Dict;
};

export function LoadingBanners({ language, dict }: Props) {
  const [hydrationComplete, setHydrationComplete] = useState(false);

  useEffect(() => setHydrationComplete(true), []);

  if (hydrationComplete) {
    return null;
  }

  return (
    <h3>
      <Spinner size="1em" />
      {dict.DetectingYourBrowser}...
    </h3>
  );
}
