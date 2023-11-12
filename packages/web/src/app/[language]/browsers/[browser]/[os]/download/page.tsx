import {
  getArticles,
  getExpandedBrowsers,
  getOses,
  getReleases,
} from "@updatemybrowser/client";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sprintf } from "sprintf-js";
import { Article } from "../../../../../../components/Article";
import { Breadcrumbs } from "../../../../../../components/Breadcrumbs";
import { makeDownloadLinkButton } from "../../../../../../components/BrowserLinkButtons";
import { Container } from "../../../../../../components/Container";
import { getDictionary } from "../../../../../../dictionaries";
import { pageTitle } from "../../../../../../utils";
import type { LanguageParams } from "../../../../route";
import type { BrowserParams } from "../../page";

type OsParams = {
  params: {
    os: string;
  };
};

export async function generateMetadata({
  params: { language, browser: browserSlug, os: osSlug },
}: LanguageParams & BrowserParams & OsParams) {
  const dict = getDictionary(language);
  const browsers = await getExpandedBrowsers();
  const browser = browsers.find((item) => item.slug.current === browserSlug);
  const oses = await getOses();
  const os = oses.find((item) => item.slug.current === osSlug);

  return {
    title: pageTitle(
      `${dict.Download} ${browser?.name} ${dict.For} ${os?.name}`,
    ),
  } as Metadata;
}

export default async function Download({
  params: { language, browser: browserSlug, os: osSlug },
}: LanguageParams & BrowserParams & OsParams) {
  const dict = getDictionary(language);
  const browsers = await getExpandedBrowsers();
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
      (item) =>
        item.translationOf &&
        defaultLanguageArticle?._id === item.translationOf?._ref,
    ) || defaultLanguageArticle;

  const DownloadLinkButton = makeDownloadLinkButton({
    language,
    dict,
    browser,
    os,
    release,
  });

  return (
    <>
      <Breadcrumbs
        language={language}
        segments={[
          { label: dict.BrowserOverview, path: "/browsers" },
          { label: browser.name, path: `/browsers/${browser.slug.current}` },
          { label: `${dict.Download} ${dict.For} ${os.name}` },
        ]}
      />
      <Container>
        {article ? (
          <Article
            {...{
              language,
              dict,
              article,
              customComponents: { DownloadLinkButton },
            }}
          />
        ) : release.downloadUrl ? (
          <section>
            <h2>
              {dict.Download} {browser.name}
            </h2>
            <p>{sprintf(dict.DownloadLinkDescription, browser.name)}</p>
            <div>
              <DownloadLinkButton />
            </div>
          </section>
        ) : (
          <>
            <h2>{dict.NotFound}</h2>
            <p>{dict.NotFoundDescription}</p>
            <Link href="/">{dict.NotFoundButton}</Link>
          </>
        )}
      </Container>
    </>
  );
}
