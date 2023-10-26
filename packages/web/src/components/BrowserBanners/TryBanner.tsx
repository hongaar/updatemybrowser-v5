"use client";

import { type BrowserWithFlatReleases } from "@updatemybrowser/client";
import {
  hydrateBrowserWithFlatReleases,
  type MaybeHydratedBrowserWithFlatReleases,
} from "@updatemybrowser/detect";
import Link from "next/link";
import { useEffect, useState } from "react";
import { sprintf } from "sprintf-js";
import type { Dict } from "../../dictionaries/en";
import { Callout } from "../Callout";
import styles from "./browserBanners.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browser: BrowserWithFlatReleases;
};

export function TryBanner({ language, dict, browser }: Props) {
  const [hydratedBrowser, setHydratedBrowser] =
    useState<MaybeHydratedBrowserWithFlatReleases>(browser);

  useEffect(
    () => setHydratedBrowser(hydrateBrowserWithFlatReleases(browser)),
    [browser],
  );

  if (
    hydratedBrowser.match?.currentBrowser ||
    !hydratedBrowser.match?.availableOnCurrentOs
  ) {
    return null;
  }

  return (
    <Callout>
      <h3>{dict.AvailableOnYourOs}</h3>
      <p>
        {sprintf(
          dict.AvailableOnYourOsDescription,
          hydratedBrowser.name,
          hydratedBrowser.match?.currentOsRelease.os.os.name,
        )}
        <br />
        {dict.AvailableOnYourOsClickButtonToDownload}
      </p>
      <Link
        tabIndex={0}
        role="button"
        className={`${styles.downloadButton}`}
        href={`/${language}/browsers/${browser.slug.current}/${hydratedBrowser.match?.currentOsRelease.os.os.slug.current}/download`}
      >
        {dict.DownloadNow}
      </Link>
    </Callout>
  );
}
