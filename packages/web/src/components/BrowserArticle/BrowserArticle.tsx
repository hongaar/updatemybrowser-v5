import { TranslateIcon } from "@sanity/icons";
import type {
  Article as ArticleType,
  BrowserWithFlatReleases,
  OS,
  Release,
} from "@updatemybrowser/client";
import type { Dict } from "../../dictionaries/en";
import { Article } from "../Article";
import { Callout } from "../Callout";
import styles from "./browserArticle.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browser: BrowserWithFlatReleases;
  os: OS;
  release: Release;
  article: ArticleType;
  customComponents?: Record<string, React.ComponentType>;
};

export async function BrowserArticle({
  language,
  dict,
  browser,
  os,
  release,
  article,
  customComponents,
}: Props) {
  return (
    <>
      {article.language !== language ? (
        <Callout warning>
          <h3>
            <TranslateIcon className={styles.translateIcon} />{" "}
            {dict.EnglishVersion}
          </h3>
          <p>{dict.NotAvailableInYourLanguageDescription}</p>
        </Callout>
      ) : null}
      <Article
        language={language}
        dict={dict}
        article={article}
        customComponents={customComponents}
      />
    </>
  );
}
