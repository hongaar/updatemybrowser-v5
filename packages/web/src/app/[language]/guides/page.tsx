import { getArticles } from "@updatemybrowser/client";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "../../../components/Container";
import { getDictionary } from "../../../dictionaries";
import { pageTitle } from "../../../utils";
import type { LanguageParams } from "../page";

export function generateMetadata({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);

  return {
    title: pageTitle(dict.Guides),
  } as Metadata;
}

export default async function Guides({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);
  const articles = await getArticles({ language });

  return (
    <Container>
      <h2>{dict.Guides}</h2>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <Link
              tabIndex={0}
              href={`/${language}/guides/${article.slug.current}`}
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
