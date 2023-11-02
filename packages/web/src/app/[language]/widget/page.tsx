import { getArticles } from "@updatemybrowser/client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Article } from "../../../components/Article";
import { Container } from "../../../components/Container";
import { getDictionary } from "../../../dictionaries";
import { pageTitle } from "../../../utils";
import type { LanguageParams } from "../route";
import { WidgetDemoButton } from "./WidgetDemoButton";

const ARTICLE_SLUG = "widget";

export function generateMetadata({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);

  return {
    title: pageTitle(dict.Widget),
  } as Metadata;
}

export default async function Widget({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);

  const articles = await getArticles();
  const defaultLanguageArticle = articles.find(
    (article) =>
      article.slug.current === ARTICLE_SLUG && article.language === "en",
  );

  const article =
    articles.find(
      (item) =>
        item.translationOf &&
        defaultLanguageArticle?._id === item.translationOf?._ref,
    ) || defaultLanguageArticle;

  if (!article) {
    throw notFound();
  }

  return (
    <Container>
      <Script src="https://updatemybrowser.org/umb.js" />
      <Article
        language={language}
        dict={dict}
        article={article}
        customComponents={{
          WidgetDemoButton,
        }}
      />
    </Container>
  );
}
