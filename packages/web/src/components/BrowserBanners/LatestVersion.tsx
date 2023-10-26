"use client";

import { type BrowserWithFlatReleases } from "@updatemybrowser/client";
import {
  hydrateBrowserWithFlatReleases,
  type MaybeHydratedBrowserWithFlatReleases,
} from "@updatemybrowser/detect";
import { useEffect, useState } from "react";
import { sprintf } from "sprintf-js";
import type { Dict } from "../../dictionaries/en";
import { Callout } from "../Callout";

type Props = {
  language: string;
  dict: Dict;
  browser: BrowserWithFlatReleases;
};

export function LatestVersion({ language, dict, browser }: Props) {
  const [hydratedBrowser, setHydratedBrowser] =
    useState<MaybeHydratedBrowserWithFlatReleases>(browser);

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
    <Callout support>
      <h3>✅ {dict.YouHaveTheLatestVersion}</h3>
      <p>{sprintf(dict.LatestVersionDescription, hydratedBrowser.name)}</p>
    </Callout>
  );
}
