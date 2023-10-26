import { getArticles } from "@updatemybrowser/client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article } from "../../../../components/Article";
import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import { Container } from "../../../../components/Container";
import { getDictionary } from "../../../../dictionaries";
import { pageTitle } from "../../../../utils";
import type { LanguageParams } from "../../page";

export type SlugParams = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams({
  params: { language },
}: LanguageParams) {
  return (await getArticles({ language })).map((article) => ({
    slug: article.slug.current,
  }));
}

export async function generateMetadata({
  params: { language, slug },
}: LanguageParams & SlugParams) {
  const dict = getDictionary(language);
  const article = (await getArticles()).find(
    (item) => item.slug.current === slug,
  );

  return {
    title: pageTitle(article?.title),
  } as Metadata;
}

export default async function Guide({
  params: { language, slug },
}: LanguageParams & SlugParams) {
  const dict = getDictionary(language);
  const article = (await getArticles({ language })).find(
    (item) => item.slug.current === slug,
  );

  if (!article) {
    throw notFound();
  }

  return (
    <>
      <Breadcrumbs
        language={language}
        segments={[
          { label: dict.Guides, path: "/guides" },
          { label: article.title },
        ]}
      />
      <Container>
        <Article language={language} dict={dict} article={article} />
      </Container>
    </>
  );
}
