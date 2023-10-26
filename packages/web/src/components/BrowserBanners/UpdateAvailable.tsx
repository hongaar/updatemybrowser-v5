"use client";

import { type BrowserWithFlatReleases } from "@updatemybrowser/client";
import {
  hydrateBrowserWithFlatReleases,
  type MaybeHydratedBrowserWithFlatReleases,
} from "@updatemybrowser/detect";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dict } from "../../dictionaries/en";
import { Callout } from "../Callout";
import styles from "./browserBanners.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browser: BrowserWithFlatReleases;
};

export function UpdateAvailable({ language, dict, browser }: Props) {
  const [hydratedBrowser, setHydratedBrowser] =
    useState<MaybeHydratedBrowserWithFlatReleases>(browser);

  useEffect(
    () => setHydratedBrowser(hydrateBrowserWithFlatReleases(browser)),
    [browser],
  );

  if (!hydratedBrowser.match?.updateAvailable) {
    return null;
  }

  return (
    <Callout warning>
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
        href={`/${language}/browsers/${browser.slug.current}/${hydratedBrowser.match?.currentOsRelease.os.os.slug.current}/update`}
      >
        {dict.UpdateNow}
      </Link>
    </Callout>
  );
}
