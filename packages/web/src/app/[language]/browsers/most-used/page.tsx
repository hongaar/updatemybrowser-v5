import { getExpandedBrowsers } from "@updatemybrowser/client";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import { BrowserList } from "../../../../components/BrowserList";
import { Callout } from "../../../../components/Callout";
import { Container } from "../../../../components/Container";
import { getDictionary } from "../../../../dictionaries";
import { compareAverageUsage, pageTitle } from "../../../../utils";
import type { LanguageParams } from "../../route";

export function generateMetadata({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);

  return {
    title: pageTitle(dict.MostUsedBrowsers),
  } as Metadata;
}

export default async function MostUsed({
  params: { language },
}: LanguageParams) {
  const dict = getDictionary(language);
  const browsers = (await getExpandedBrowsers()).sort(compareAverageUsage);

  return (
    <>
      <Breadcrumbs
        language={language}
        segments={[
          { label: dict.BrowserOverview, path: "/browsers" },
          { label: dict.MostUsedBrowsers },
        ]}
      />
      <Container>
        <BrowserList
          language={language}
          dict={dict}
          heading={`📊 ${dict.MostUsedBrowsers}`}
          intro={<p>{dict.MostUsedBrowsersDescription}</p>}
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
            <Link contextMenu="" tabIndex={0} href={`/${language}/browsers`}>
              🌐 {dict.BrowserOverview}
            </Link>
          </li>
          <li>
            <Link tabIndex={0} href={`/${language}/browsers/most-popular`}>
              ❤️ {dict.MostPopularBrowsers}
            </Link>
          </li>
        </ul>
      </Container>
    </>
  );
}
