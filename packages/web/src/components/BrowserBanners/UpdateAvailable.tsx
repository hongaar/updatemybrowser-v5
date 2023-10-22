"use client";

import { type BrowserWithFlatReleases } from "@updatemybrowser/client";
import {
  hydrateBrowserWithFlatReleases,
  type MaybeHydratedBrowsersWithFlatReleases,
} from "@updatemybrowser/detect";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dict } from "../../dictionaries/en";
import styles from "./browserBanners.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browser: BrowserWithFlatReleases;
};

export function UpdateAvailable({ language, dict, browser }: Props) {
  const [hydratedBrowser, setHydratedBrowser] =
    useState<MaybeHydratedBrowsersWithFlatReleases>(browser);

  useEffect(
    () => setHydratedBrowser(hydrateBrowserWithFlatReleases(browser)),
    [browser],
  );

  if (!hydratedBrowser.match?.updateAvailable) {
    return null;
  }

  return (
    <div className={styles.updateAvailable}>
      <h3>⚠️ {dict.UpdateAvailable}</h3>
      <p>
        {dict.CurrentBrowserAndUpdateAvailable}
        <br />
        {dict.PleaseClickButtonToUpdate}
      </p>
      <Link
        tabIndex={0}
        role="button"
        className={`warning ${styles.updateButton}`}
        href={"#"}
      >
        {dict.UpdateNow}
      </Link>
    </div>
  );
}
