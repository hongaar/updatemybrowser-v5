import {
  getExpandedBrowsers,
  getFeatureCategories,
  getFeatures,
  getOses,
} from "@updatemybrowser/client";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import { BrowserComparison } from "../../../../components/BrowserComparison";
import { Container } from "../../../../components/Container";
import { getDictionary } from "../../../../dictionaries";
import { compareAverageUsage, pageTitle } from "../../../../utils";
import type { LanguageParams } from "../../route";

export function generateMetadata({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);

  return {
    title: pageTitle(dict.BrowserFeaturesComparison),
  } as Metadata;
}

export default async function Comparison({
  params: { language },
}: LanguageParams) {
  const dict = getDictionary(language);
  const browsers = (await getExpandedBrowsers()).sort(compareAverageUsage);
  const oses = await getOses();
  const featureCategories = await getFeatureCategories();
  const features = await getFeatures();

  return (
    <>
      <Breadcrumbs
        language={language}
        segments={[
          { label: dict.BrowserOverview, path: "/browsers" },
          { label: dict.BrowserFeaturesComparison },
        ]}
      />
      <Container>
        <BrowserComparison
          language={language}
          dict={dict}
          heading={`🏷️ ${dict.BrowserFeaturesComparison}`}
          intro={<p>{dict.BrowserFeaturesComparisonDescription}</p>}
          browsers={browsers}
          oses={oses}
          featureCategories={featureCategories}
          features={features}
        />
        <h3>{dict.AdditionalBrowserOverviews}</h3>
        <p>{dict.AdditionalBrowserOverviewsDescription}</p>
        <ul>
          <li>
            <Link tabIndex={0} href={`/${language}/browsers`}>
              🌐 {dict.BrowserOverview}
            </Link>
          </li>
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
    </>
  );
}
