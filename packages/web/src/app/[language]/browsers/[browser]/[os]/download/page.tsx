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
import { Breadcrumbs } from "../../../../../../components/Breadcrumbs";
import { BrowserArticle } from "../../../../../../components/BrowserArticle";
import { Container } from "../../../../../../components/Container";
import { ExternalLinkIcon } from "../../../../../../components/Icon";
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
  params: { language, browser: browserSlug, os: osSlug },
}: LanguageParams & BrowserParams & OsParams) {
  const dict = getDictionary(language);
  const browsers = await getBrowsersWithFlatReleases();
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
      (item) =>
        item.translationOf &&
        defaultLanguageArticle?._id === item.translationOf?._ref,
    ) || defaultLanguageArticle;

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
          <BrowserArticle
            {...{ language, dict, browser, os, release, article }}
          />
        ) : null}
        {release.downloadUrl ? (
          <section>
            <h2>
              {dict.Download} {browser.name}
            </h2>
            <p>{sprintf(dict.DownloadLinkDescription, browser.name)}</p>
            <div>
              <Link
                tabIndex={0}
                role="button"
                target="_blank"
                rel="noopener noreferrer"
                href={release.downloadUrl}
              >
                <ExternalLinkIcon fill={"currentColor"} /> {dict.Download}{" "}
                {browser.name} {dict.For} {os.name}
              </Link>
            </div>
          </section>
        ) : null}
      </Container>
    </>
  );
}
