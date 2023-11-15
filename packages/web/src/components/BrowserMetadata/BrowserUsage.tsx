import { type FlatBrowser } from "@updatemybrowser/client";
import type { Dict } from "../../dictionaries/en";
import { averageUsage } from "../../utils";
import styles from "./browserMetadata.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browser: FlatBrowser;
};

export function willShowBrowserUsage(browser: FlatBrowser) {
  return averageUsage(browser);
}

export function BrowserUsage({ language, dict, browser }: Props) {
  return willShowBrowserUsage(browser) ? (
    <div className={styles.metadataItem}>
      <div className={styles.metadataLabel}>{dict.GlobalUsage}</div>
      <div className={styles.metadata}>
        <strong className={styles.stat}>
          {averageUsage(browser).toFixed(2)} %
        </strong>
      </div>
    </div>
  ) : null;
}
