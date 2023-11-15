import { getExpandedBrowsers } from "@updatemybrowser/client";
import type { Metadata } from "next";
import Link from "next/link";
import { BrowserGrid } from "../../../components/BrowserGrid";
import { Callout } from "../../../components/Callout";
import { Container } from "../../../components/Container";
import { getDictionary } from "../../../dictionaries";
import { compareAverageUsage, pageTitle } from "../../../utils";
import type { LanguageParams } from "../route";

export function generateMetadata({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);

  return {
    title: pageTitle(dict.BrowserOverview),
  } as Metadata;
}

export default async function Browsers({
  params: { language },
}: LanguageParams) {
  const dict = getDictionary(language);
  const browsers = (await getExpandedBrowsers()).sort(compareAverageUsage);

  return (
    <Container>
      <BrowserGrid language={language} dict={dict} browsers={browsers} />
      <h3>{dict.AdditionalBrowserOverviews}</h3>
      <p>{dict.AdditionalBrowserOverviewsDescription}</p>
      <Callout href={`/${language}/browsers/comparison`}>
        <h3>🏷️ {dict.BrowserFeaturesComparison}</h3>
        <p>{dict.BrowserFeaturesComparisonDescription}</p>
      </Callout>
      <ul>
        <li>
          <Link tabIndex={0} href={`/${language}/browsers/most-popular`}>
            ❤️ {dict.MostPopularBrowsers}
          </Link>
        </li>
        <li>
          <Link tabIndex={0} href={`/${language}/browsers/most-used`}>
            📊 {dict.MostUsedBrowsers}
          </Link>
        </li>
      </ul>
    </Container>
  );
}
