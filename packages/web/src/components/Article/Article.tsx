import {
  getBrowsersWithFlatReleases,
  getOses,
  type Article,
} from "@updatemybrowser/client";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Dict } from "../../dictionaries/en";
import {
  makeDownloadLinkButton,
  makeUpdateLinkButton,
} from "../BrowserLinkButtons";
import { Callout } from "../Callout";
import { BrowserTag, OsTag, TagList } from "../Tag";
import { Image } from "./Image";
import styles from "./article.module.scss";

type Props = {
  language: string;
  dict: Dict;
  article: Article;
  customComponents?: Record<string, React.ComponentType>;
};

export async function Article({
  language,
  dict,
  article,
  customComponents,
}: Props) {
  const oses = await getOses();
  const browsers = await getBrowsersWithFlatReleases();
  const browser = browsers.find((item) => item._id === article.browser?._ref);

  const components = {
    Callout,
    DownloadLinkButton: makeDownloadLinkButton({ language, dict, browser }),
    UpdateLinkButton: makeUpdateLinkButton({ language, dict, browser }),
    img: Image,
    ...customComponents,
  };

  return (
    <>
      {(article.oses && article.oses.length > 0) || article.browser ? (
        <Callout muted>
          <TagList>
            <>{dict.AppliesTo}:</>
            {browser ? (
              <BrowserTag
                language={language}
                dict={dict}
                browser={browser}
                detectCurrent={false}
              />
            ) : null}
            {article.oses && article.oses.length > 0 && article.browser
              ? dict.For
              : null}
            {article.oses && article.oses.length > 0
              ? article.oses.map((osRef, index) => {
                  const os = oses.find((item) => item._id === osRef._ref);
                  return os ? (
                    <OsTag
                      key={index}
                      language={language}
                      dict={dict}
                      os={os}
                      detectCurrent={false}
                    />
                  ) : null;
                })
              : null}
          </TagList>
        </Callout>
      ) : null}
      <article>
        <h2 className={styles.heading}>{article.title}</h2>
        {article.excerpt ? (
          <p className={styles.excerpt}>{article.excerpt}</p>
        ) : null}
        <MDXRemote source={article.contents} components={components} />
      </article>
    </>
  );
}
