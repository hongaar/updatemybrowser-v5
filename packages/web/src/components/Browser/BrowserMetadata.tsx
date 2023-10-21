import {
  averageUsage,
  type BrowserWithFlatReleases,
} from "@updatemybrowser/client";
import { getDictionary } from "../../dictionaries";
import { ExternalLink } from "../Link";
import { ReleaseTag, TagList } from "../Tag";
import styles from "./browser.module.scss";

type Props = {
  language: string;
  browser: BrowserWithFlatReleases;
};

export function BrowserMetadata({ language, browser }: Props) {
  const dict = getDictionary(language);

  return (
    <div className={styles.metadataList}>
      <div className={styles.metadataItem}>
        <div className={styles.metadataLabel}>{dict.AvailableOn}</div>
        <div className={styles.metadata}>
          <TagList>
            {browser.releases.map((release, index) => (
              <ReleaseTag key={index} release={release} />
            ))}
          </TagList>
        </div>
      </div>

      <div className={styles.metadataItem}>
        <div className={styles.metadataLabel}>{dict.Popularity}</div>
        <div className={styles.metadata}>
          <strong className={styles.stat}>❤️ {browser.popularity}</strong>{" "}
          <ExternalLink href="https://alternativeto.net">
            {dict.Source}
          </ExternalLink>
        </div>
      </div>

      <div className={styles.metadataItem}>
        <div className={styles.metadataLabel}>{dict.GlobalUsage}</div>
        <div className={styles.metadata}>
          <strong className={styles.stat}>
            {averageUsage(browser).toFixed(2)} %
          </strong>{" "}
          <ExternalLink href="https://caniuse.com">{dict.Source}</ExternalLink>
        </div>
      </div>
    </div>
  );
}
