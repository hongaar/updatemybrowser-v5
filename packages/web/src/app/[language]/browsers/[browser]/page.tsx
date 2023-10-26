import {
  getArticles,
  getBrowsers,
  getBrowsersWithFlatReleases,
} from "@updatemybrowser/client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import { BrowserPage } from "../../../../components/BrowserPage";
import { Container } from "../../../../components/Container";
import { FeaturedArticles } from "../../../../components/FeaturedArticles";
import { getDictionary } from "../../../../dictionaries";
import { pageTitle } from "../../../../utils";
import type { LanguageParams } from "../../page";

export type BrowserParams = {
  params: {
    browser: string;
  };
};

export async function generateStaticParams() {
  return (await getBrowsers()).map((browser) => ({ browser: browser.name }));
}

export async function generateMetadata({
  params: { browser: browserSlug, language },
}: LanguageParams & BrowserParams) {
  const dict = getDictionary(language);
  const browsers = await getBrowsersWithFlatReleases();
  const browser = browsers.find((item) => item.slug.current === browserSlug);

  return {
    title: pageTitle(browser?.name),
  } as Metadata;
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

  const articles = (await getArticles({ language })).filter(
    (article) => !!article.browser && article.oses && article.oses?.length > 0,
  );
  const featuredArticles = articles.filter((article) => {
    return (browser.featuredArticles || [])
      .map((item) => item._ref)
      .includes(article.translationOf?._ref as string);
  });

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
        <FeaturedArticles
          language={language}
          dict={dict}
          browser={browser}
          articles={featuredArticles}
        />
      </Container>
    </>
  );
}
