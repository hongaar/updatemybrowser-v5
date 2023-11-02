import { type BrowserWithFlatReleases } from "@updatemybrowser/client";
import Link from "next/link";
import type { Dict } from "../../dictionaries/en";
import styles from "./osLinks.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browser: BrowserWithFlatReleases;
  verb: string;
  urlSuffix: "update" | "download";
};

export function OsLinks({ language, dict, browser, verb, urlSuffix }: Props) {
  if (browser.releases.length === 0) {
    return null;
  }

  return (
    <section className={styles.downloadLinks}>
      <h3>{`${verb} ${browser.name} ${dict.Browser}`}</h3>
      <ul>
        {browser.releases.map((release, index) => (
          <li key={index}>
            <Link
              tabIndex={0}
              href={`/${language}/browsers/${browser.slug.current}/${release.os.os.slug.current}/${urlSuffix}`}
            >
              {verb} {browser.name} {dict.For} {release.os.os.name}
            </Link>
            {(urlSuffix === "update" && release.updateArticle) ||
            (urlSuffix === "download" && release.downloadArticle) ? (
              <small className={styles.muted}> 📋 {dict.StepByStepGuide}</small>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
