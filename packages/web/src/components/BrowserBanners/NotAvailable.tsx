"use client";

import { type FlatBrowser } from "@updatemybrowser/client";
import {
  hydrateBrowserWithFlatReleases,
  type MaybeHydratedBrowserWithFlatReleases,
} from "@updatemybrowser/detect";
import { useEffect, useState } from "react";
import type { Dict } from "../../dictionaries/en";
import { Callout } from "../Callout";

type Props = {
  language: string;
  dict: Dict;
  browser: FlatBrowser;
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
    <Callout error>
      <h3>🚫 {dict.NotAvailableOnYourOs}</h3>
      <p>{dict.NotAvailableOnYourOsDescription}</p>
    </Callout>
  );
}
