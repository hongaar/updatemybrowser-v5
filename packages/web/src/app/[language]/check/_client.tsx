"use client";

import { type BrowserWithFlatReleases } from "@updatemybrowser/client";
import {
  hydrateBrowsersWithFlatReleases,
  type MaybeHydratedBrowsersWithFlatReleases,
} from "@updatemybrowser/detect";
import { useEffect, useState } from "react";
import { BrowserPage } from "../../../components/BrowserPage";
import { Container } from "../../../components/Container";
import type { Dict } from "../../../dictionaries/en";

type Props = {
  language: string;
  dict: Dict;
  browsers: BrowserWithFlatReleases[];
};

export default function ClientCheck({ language, dict, browsers }: Props) {
  const [hydratedBrowsers, setHydratedBrowsers] =
    useState<MaybeHydratedBrowsersWithFlatReleases[]>(browsers);

  useEffect(
    () => setHydratedBrowsers(hydrateBrowsersWithFlatReleases(browsers)),
    [browsers],
  );

  const currentBrowser = hydratedBrowsers.find(
    (item) => item.match?.currentBrowser,
  );

  if (!currentBrowser) {
    return null;
  }

  return (
    <>
      <Container>
        <BrowserPage
          language={language}
          dict={dict}
          browsers={browsers}
          browser={currentBrowser}
          headingPrefix={dict.YouAreUsing}
        />
      </Container>
    </>
  );
}
