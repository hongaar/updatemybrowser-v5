"use client";

import {
  type Article,
  type BrowserWithFlatReleases,
} from "@updatemybrowser/client";
import {
  hydrateBrowsersWithFlatReleases,
  type MaybeHydratedBrowserWithFlatReleases,
} from "@updatemybrowser/detect";
import { useEffect, useMemo, useState } from "react";
import { BrowserPage } from "../../../components/BrowserPage";
import { Container } from "../../../components/Container";
import { Delay } from "../../../components/Delay";
import { Environment } from "../../../components/Environment";
import { FeaturedArticles } from "../../../components/FeaturedArticles";
import { MaybeDetected } from "../../../components/MaybeDetected";
import { Spinner } from "../../../components/Spinner";
import type { Dict } from "../../../dictionaries/en";

type Props = {
  language: string;
  dict: Dict;
  browsers: BrowserWithFlatReleases[];
  articles: Article[];
};

export default function ClientCheck({
  language,
  dict,
  browsers,
  articles,
}: Props) {
  const [hydratedBrowsers, setHydratedBrowsers] =
    useState<MaybeHydratedBrowserWithFlatReleases[]>(browsers);
  const [detectionCompleted, setDetectionCompleted] = useState(false);

  useEffect(() => {
    setHydratedBrowsers(hydrateBrowsersWithFlatReleases(browsers));
    setDetectionCompleted(true);
  }, [browsers]);

  const currentBrowser = hydratedBrowsers.find(
    (item) => item.match?.browserMatch,
  );

  const featuredArticles = useMemo(() => {
    return articles.filter((article) => {
      return (currentBrowser?.featuredArticles || [])
        .map((item) => item._ref)
        .includes(article.translationOf?._ref as string);
    });
  }, [articles, currentBrowser]);

  return (
    <Container>
      {detectionCompleted ? (
        <>
          {currentBrowser ? (
            <>
              <BrowserPage
                language={language}
                dict={dict}
                browsers={browsers}
                browser={currentBrowser}
                headingPrefix={dict.YouAreUsing}
              />
              <FeaturedArticles
                language={language}
                dict={dict}
                browser={currentBrowser}
                articles={featuredArticles}
              />
              <MaybeDetected
                language={language}
                dict={dict}
                browsers={browsers}
                browser={currentBrowser}
              />
            </>
          ) : (
            <>
              <h2>{dict.BrowserNotDetected}</h2>
              <p>{dict.BrowserNotDetectedDescription}</p>
            </>
          )}
          <Environment language={language} dict={dict} />
        </>
      ) : (
        <Delay seconds={0.2}>
          <h2>
            <Spinner size="1.5em" />
            {dict.DetectingYourBrowser}...
          </h2>
        </Delay>
      )}
    </Container>
  );
}
