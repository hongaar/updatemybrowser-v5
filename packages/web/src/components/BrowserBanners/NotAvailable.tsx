"use client";

import { type BrowserWithFlatReleases } from "@updatemybrowser/client";
import {
  hydrateBrowserWithFlatReleases,
  type MaybeHydratedBrowserWithFlatReleases,
} from "@updatemybrowser/detect";
import { useEffect, useState } from "react";
import type { Dict } from "../../dictionaries/en";
import styles from "./browserBanners.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browser: BrowserWithFlatReleases;
};

export function NotAvailable({ language, dict, browser }: Props) {
  const [hydratedBrowser, setHydratedBrowser] =
    useState<MaybeHydratedBrowserWithFlatReleases>(browser);

  useEffect(
    () => setHydratedBrowser(hydrateBrowserWithFlatReleases(browser)),
    [browser],
  );

  if (!hydratedBrowser.match || hydratedBrowser.match?.availableOnCurrentOs) {
    return null;
  }

  return (
    <div className={styles.notAvailable}>
      <h3>🚫 {dict.NotAvailableOnYourOs}</h3>
      <p>{dict.NotAvailableOnYourOsDescription}</p>
    </div>
  );
}
