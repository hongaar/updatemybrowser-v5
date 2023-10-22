import {
  getBrowsers,
  getBrowsersWithFlatReleases,
} from "@updatemybrowser/client";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import { BrowserPage } from "../../../../components/BrowserPage";
import { Container } from "../../../../components/Container";
import { getDictionary } from "../../../../dictionaries";
import type { LanguageParams } from "../page";

type BrowserParams = {
  params: {
    browser: string;
  };
};

export async function generateStaticParams() {
  return (await getBrowsers()).map((browser) => ({ browser: browser.name }));
}

export default async function Browser({
  params: { browser: browserSlug, language },
}: LanguageParams & BrowserParams) {
  const dict = getDictionary(language);
  const browsers = await getBrowsersWithFlatReleases();
  const browser = browsers.find((item) => item.slug.current === browserSlug);

  if (!browser) {
    throw notFound();
  }

  return (
    <>
      <Breadcrumbs
        language={language}
        segments={[
          { label: dict.BrowserOverview, path: "/browsers" },
          { label: browser.name },
        ]}
      />
      <Container>
        <BrowserPage
          language={language}
          dict={dict}
          browsers={browsers}
          browser={browser}
        />
      </Container>
    </>
  );
}
