"use client";

import { type BrowserWithFlatReleases } from "@updatemybrowser/client";
import {
  hydrateBrowserWithFlatReleases,
  type MaybeHydratedBrowsersWithFlatReleases,
} from "@updatemybrowser/detect";
import { useEffect, useState } from "react";
import { sprintf } from "sprintf-js";
import type { Dict } from "../../dictionaries/en";
import styles from "./browserBanners.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browser: BrowserWithFlatReleases;
};

export function LatestVersion({ language, dict, browser }: Props) {
  const [hydratedBrowser, setHydratedBrowser] =
    useState<MaybeHydratedBrowsersWithFlatReleases>(browser);

  useEffect(
    () => setHydratedBrowser(hydrateBrowserWithFlatReleases(browser)),
    [browser],
  );

  if (
    !hydratedBrowser.match?.currentBrowser ||
    hydratedBrowser.match?.updateAvailable
  ) {
    return null;
  }

  return (
    <div className={styles.latestVersion}>
      <h3>✅ {dict.YouHaveTheLatestVersion}</h3>
      <p>{sprintf(dict.LatestVersionDescription, hydratedBrowser.name)}</p>
    </div>
  );
}
