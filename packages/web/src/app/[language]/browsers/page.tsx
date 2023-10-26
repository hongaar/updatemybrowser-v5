import { getBrowsersWithFlatReleases } from "@updatemybrowser/client";
import type { Metadata } from "next";
import { BrowserGrid } from "../../../components/BrowserGrid";
import { Container } from "../../../components/Container";
import { getDictionary } from "../../../dictionaries";
import { compareAverageUsage, pageTitle } from "../../../utils";
import type { LanguageParams } from "../page";

export function generateMetadata({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);

  return {
    title: pageTitle(dict.BrowserOverview),
  } as Metadata;
}

export default async function Home({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);
  const browsers = (await getBrowsersWithFlatReleases()).sort(
    compareAverageUsage,
  );

  return (
    <Container>
      <BrowserGrid language={language} browsers={browsers} />
    </Container>
  );
}
