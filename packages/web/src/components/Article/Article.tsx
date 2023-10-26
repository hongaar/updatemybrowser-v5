import type { Article } from "@updatemybrowser/client";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Dict } from "../../dictionaries/en";
import { Callout } from "../Callout";
import styles from "./article.module.scss";

type Props = {
  language: string;
  dict: Dict;
  article: Article;
};

export function Article({ article }: Props) {
  return (
    <>
      <h2 className={styles.heading}>{article.title}</h2>
      <p className={styles.excerpt}>{article.excerpt}</p>
      <MDXRemote
        source={article.contents}
        components={{
          Callout,
        }}
      />
    </>
  );
}
