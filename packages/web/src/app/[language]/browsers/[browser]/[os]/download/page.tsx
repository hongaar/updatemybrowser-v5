import {
  getArticles,
  getBrowsersWithFlatReleases,
  getOses,
  getReleases,
} from "@updatemybrowser/client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article } from "../../../../../../components/Article";
import { Breadcrumbs } from "../../../../../../components/Breadcrumbs";
import { Callout } from "../../../../../../components/Callout";
import { Container } from "../../../../../../components/Container";
import { getDictionary } from "../../../../../../dictionaries";
import { pageTitle } from "../../../../../../utils";
import type { LanguageParams } from "../../../../page";
import type { BrowserParams } from "../../page";

type OsParams = {
  params: {
    os: string;
  };
};

export async function generateMetadata({
  params: { browser: browserSlug, language },
}: LanguageParams & BrowserParams) {
  const dict = getDictionary(language);
  const browsers = await getBrowsersWithFlatReleases();
  const browser = browsers.find((item) => item.slug.current === browserSlug);

  return {
    title: pageTitle(`${dict.Download} ${browser?.name}`),
  } as Metadata;
}

export default async function Download({
  params: { language, browser: browserSlug, os: osSlug },
}: LanguageParams & BrowserParams & OsParams) {
  const dict = getDictionary(language);
  const browsers = await getBrowsersWithFlatReleases();
  const browser = browsers.find((item) => item.slug.current === browserSlug);

  if (!browser) {
    throw notFound();
  }

  const oses = await getOses();
  const os = oses.find((item) => item.slug.current === osSlug);

  if (!os) {
    throw notFound();
  }

  const releases = await getReleases();
  const release = releases.find(
    (item) =>
      item.browser._ref === browser._id &&
      item.oses.some((osItem) => osItem.os._ref === os._id),
  );

  if (!release) {
    throw notFound();
  }

  const articles = await getArticles();
  const defaultLanguageArticle = articles.find(
    (article) => release.downloadArticle?._ref === article._id,
  );

  const article =
    articles.find(
      (item) => defaultLanguageArticle?._id === item.translationOf?._ref,
    ) || defaultLanguageArticle;

  if (!article) {
    throw notFound();
  }

  return (
    <>
      <Breadcrumbs
        language={language}
        segments={[
          { label: dict.BrowserOverview, path: "/browsers" },
          { label: browser.name, path: `/browsers/${browser.slug.current}` },
          { label: dict.DownloadNow },
        ]}
      />
      <Container>
        {article.language !== language ? (
          <Callout warning>
            <h3>💬 {dict.EnglishVersion}</h3>
            <p>{dict.NotAvailableInYourLanguageDescription}</p>
          </Callout>
        ) : null}
        <Article language={language} dict={dict} article={article} />
      </Container>
    </>
  );
}
