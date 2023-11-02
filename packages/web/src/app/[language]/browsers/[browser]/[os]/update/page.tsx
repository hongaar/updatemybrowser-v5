import {
  getArticles,
  getBrowsersWithFlatReleases,
  getOses,
  getReleases,
} from "@updatemybrowser/client";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sprintf } from "sprintf-js";
import { Article } from "../../../../../../components/Article";
import { Breadcrumbs } from "../../../../../../components/Breadcrumbs";
import { makeUpdateLinkButton } from "../../../../../../components/BrowserLinkButtons";
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
  const browsers = await getBrowsersWithFlatReleases();
  const browser = browsers.find((item) => item.slug.current === browserSlug);
  const oses = await getOses();
  const os = oses.find((item) => item.slug.current === osSlug);

  return {
    title: pageTitle(`${dict.Update} ${browser?.name} ${dict.For} ${os?.name}`),
  } as Metadata;
}

export default async function Update({
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
    (article) => release.updateArticle?._ref === article._id,
  );

  const article =
    articles.find(
      (item) =>
        item.translationOf &&
        defaultLanguageArticle?._id === item.translationOf?._ref,
    ) || defaultLanguageArticle;

  const UpdateLinkButton = makeUpdateLinkButton({
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
          { label: `${dict.Update} ${dict.For} ${os.name}` },
        ]}
      />
      <Container>
        {article ? (
          <Article
            {...{
              language,
              dict,
              article,
              customComponents: {
                UpdateLinkButton,
              },
            }}
          />
        ) : release.updateUrl || release.downloadUrl ? (
          <section>
            <h2>
              {dict.Update} {browser.name}
            </h2>
            <p>{sprintf(dict.UpdateLinkDescription, browser.name)}</p>
            <div>
              <UpdateLinkButton />
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
