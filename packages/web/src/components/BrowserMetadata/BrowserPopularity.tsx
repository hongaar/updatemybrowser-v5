import { type FlatBrowser } from "@updatemybrowser/client";
import type { Dict } from "../../dictionaries/en";
import styles from "./browserMetadata.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browser: FlatBrowser;
};

export function BrowserPopularity({ language, dict, browser }: Props) {
  return browser.popularity ? (
    <div className={styles.metadataItem}>
      <div className={styles.metadataLabel}>{dict.Popularity}</div>
      <div className={styles.metadata}>
        <strong className={styles.stat}>❤️ {browser.popularity}</strong>
      </div>
    </div>
  ) : null;
}
