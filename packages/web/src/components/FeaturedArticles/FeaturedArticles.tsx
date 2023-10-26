import { type Article, type Browser } from "@updatemybrowser/client";
import Link from "next/link";
import { sprintf } from "sprintf-js";
import type { Dict } from "../../dictionaries/en";
import styles from "./featuredArticles.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browser: Browser;
  articles: Article[];
};

export function FeaturedArticles({ language, dict, browser, articles }: Props) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className={styles.featuredArticles}>
      <h3>{sprintf(dict.GuidesForBrowser, browser.name)}</h3>
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
    </section>
  );
}
