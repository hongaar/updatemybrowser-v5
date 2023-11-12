import { type FlatBrowser } from "@updatemybrowser/client";
import type { Dict } from "../../dictionaries/en";
import { averageUsage } from "../../utils";
import { ReleaseTag, TagList } from "../Tag";
import styles from "./browserMetadata.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browser: FlatBrowser;
};

const SHOW_POPULARITY = false;
const SHOW_USAGE = false;

export function BrowserMetadata({ language, dict, browser }: Props) {
  return (
    <div className={styles.metadataList}>
      {browser.releases.length > 0 ? (
        <div className={styles.metadataItem}>
          <div className={styles.metadataLabel}>{dict.AvailableOn}</div>
          <div className={styles.metadata}>
            <TagList>
              {browser.releases.map((release, index) => (
                <ReleaseTag
                  language={language}
                  key={index}
                  dict={dict}
                  release={release}
                />
              ))}
            </TagList>
          </div>
        </div>
      ) : null}

      {SHOW_POPULARITY && browser.popularity ? (
        <div className={styles.metadataItem}>
          <div className={styles.metadataLabel}>{dict.Popularity}</div>
          <div className={styles.metadata}>
            <strong className={styles.stat}>❤️ {browser.popularity}</strong>
          </div>
        </div>
      ) : null}

      {SHOW_USAGE && averageUsage(browser) ? (
        <div className={styles.metadataItem}>
          <div className={styles.metadataLabel}>{dict.GlobalUsage}</div>
          <div className={styles.metadata}>
            <strong className={styles.stat}>
              {averageUsage(browser).toFixed(2)} %
            </strong>
          </div>
        </div>
      ) : null}
    </div>
  );
}
