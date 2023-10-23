import { type BrowserWithFlatReleases } from "@updatemybrowser/client";
import type { Dict } from "../../dictionaries/en";
import { averageUsage } from "../../utils";
import { ExternalLink } from "../Link";
import { ReleaseTag, TagList } from "../Tag";
import styles from "./browserMetadata.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browser: BrowserWithFlatReleases;
};

export function BrowserMetadata({ language, dict, browser }: Props) {
  return (
    <div className={styles.metadataList}>
      {browser.releases.length > 0 ? (
        <div className={styles.metadataItem}>
          <div className={styles.metadataLabel}>{dict.AvailableOn}</div>
          <div className={styles.metadata}>
            <TagList>
              {browser.releases.map((release, index) => (
                <ReleaseTag key={index} dict={dict} release={release} />
              ))}
            </TagList>
          </div>
        </div>
      ) : null}

      {browser.popularity ? (
        <div className={styles.metadataItem}>
          <div className={styles.metadataLabel}>{dict.Popularity}</div>
          <div className={styles.metadata}>
            <strong className={styles.stat}>❤️ {browser.popularity}</strong>{" "}
            <ExternalLink href="https://alternativeto.net/category/browsers/web-browser/">
              AlternativeTo
            </ExternalLink>
          </div>
        </div>
      ) : null}

      {averageUsage(browser) ? (
        <div className={styles.metadataItem}>
          <div className={styles.metadataLabel}>{dict.GlobalUsage}</div>
          <div className={styles.metadata}>
            <strong className={styles.stat}>
              {averageUsage(browser).toFixed(2)} %
            </strong>{" "}
            <ExternalLink href="https://caniuse.com">Can I Use</ExternalLink>
          </div>
        </div>
      ) : null}
    </div>
  );
}
