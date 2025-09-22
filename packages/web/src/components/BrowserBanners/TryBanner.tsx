"use client";

import { type FlatBrowser } from "@updatemybrowser/client";
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
  browser: FlatBrowser;
  browsers?: FlatBrowser[];
};

export function TryBanner({ language, dict, browser, browsers }: Props) {
  const [hydratedBrowser, setHydratedBrowser] =
    useState<MaybeHydratedBrowserWithFlatReleases>(browser);

  useEffect(
    () => setHydratedBrowser(hydrateBrowserWithFlatReleases(browser, browsers)),
    [browser, browsers],
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
          hydratedBrowser.match?.mightBeDisguised
            ? dict.AvailableOnYourOsDescriptionMaybeDisguised
            : dict.AvailableOnYourOsDescription,
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
        {dict.Download} {dict.For}{" "}
        {hydratedBrowser.match?.currentOsRelease.os.os.name}
      </Link>
    </Callout>
  );
}
