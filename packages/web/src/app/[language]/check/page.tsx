import {
  getArticles,
  getBrowsersWithFlatReleases,
} from "@updatemybrowser/client";
import type { Metadata } from "next";
import { getDictionary } from "../../../dictionaries";
import { pageTitle } from "../../../utils";
import type { LanguageParams } from "../page";
import ClientCheck from "./_client";

export function generateMetadata({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);

  return {
    title: pageTitle(dict.BrowserCheck),
  } as Metadata;
}

export default async function Check({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);
  const browsers = await getBrowsersWithFlatReleases();
  const articles = (await getArticles({ language })).filter(
    (article) => !!article.browser && article.oses && article.oses?.length > 0,
  );

  return (
    <>
      <ClientCheck
        language={language}
        dict={dict}
        browsers={browsers}
        articles={articles}
      />
    </>
  );
}
