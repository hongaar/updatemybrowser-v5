import { getBrowsersWithFlatReleases } from "@updatemybrowser/client";
import { BrowserGrid } from "../../../components/BrowserGrid";
import { Container } from "../../../components/Container";
import { getDictionary } from "../../../dictionaries";
import { compareAverageUsage } from "../../../utils";

export type LanguageParams = {
  params: {
    language: string;
  };
};

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
