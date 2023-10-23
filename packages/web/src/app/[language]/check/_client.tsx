"use client";

import { type BrowserWithFlatReleases } from "@updatemybrowser/client";
import {
  hydrateBrowsersWithFlatReleases,
  type MaybeHydratedBrowserWithFlatReleases,
} from "@updatemybrowser/detect";
import { useEffect, useState } from "react";
import { BrowserPage } from "../../../components/BrowserPage";
import { Container } from "../../../components/Container";
import { Environment } from "../../../components/Environment";
import { MaybeDetected } from "../../../components/MaybeDetected";
import type { Dict } from "../../../dictionaries/en";

type Props = {
  language: string;
  dict: Dict;
  browsers: BrowserWithFlatReleases[];
};

export default function ClientCheck({ language, dict, browsers }: Props) {
  const [hydratedBrowsers, setHydratedBrowsers] =
    useState<MaybeHydratedBrowserWithFlatReleases[]>(browsers);

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
        <MaybeDetected
          language={language}
          dict={dict}
          browsers={browsers}
          browser={currentBrowser}
        />
        <Environment language={language} dict={dict} />
      </Container>
    </>
  );
}
