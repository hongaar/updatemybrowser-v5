import { getExpandedBrowsers } from "@updatemybrowser/client";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import { BrowserList } from "../../../../components/BrowserList";
import { Callout } from "../../../../components/Callout";
import { Container } from "../../../../components/Container";
import { getDictionary } from "../../../../dictionaries";
import { comparePopularity, pageTitle } from "../../../../utils";
import type { LanguageParams } from "../../route";

export function generateMetadata({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);

  return {
    title: pageTitle(dict.MostPopularBrowsers),
  } as Metadata;
}

export default async function MostPopular({
  params: { language },
}: LanguageParams) {
  const dict = getDictionary(language);
  const browsers = (await getExpandedBrowsers()).sort(comparePopularity);

  return (
    <>
      <Breadcrumbs
        language={language}
        segments={[
          { label: dict.BrowserOverview, path: "/browsers" },
          { label: dict.MostPopularBrowsers },
        ]}
      />
      <Container>
        <BrowserList
          language={language}
          dict={dict}
          heading={`❤️ ${dict.MostPopularBrowsers}`}
          intro={<p>{dict.MostPopularBrowsersDescription}</p>}
          browsers={browsers}
        />
        <h3>{dict.AdditionalBrowserOverviews}</h3>
        <p>{dict.AdditionalBrowserOverviewsDescription}</p>
        <Callout href={`/${language}/browsers/comparison`}>
          <h3>🏷️ {dict.BrowserFeaturesComparison}</h3>
          <p>{dict.BrowserFeaturesComparisonDescription}</p>
        </Callout>
        <ul>
          <li>
            <Link tabIndex={0} href={`/${language}/browsers`}>
              🌐 {dict.BrowserOverview}
            </Link>
          </li>
          <li>
            <Link tabIndex={0} href={`/${language}/browsers/most-used`}>
              📊 {dict.MostUsedBrowsers}
            </Link>
          </li>
        </ul>
      </Container>
    </>
  );
}
