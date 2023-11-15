import { type FlatBrowser } from "@updatemybrowser/client";
import type { Dict } from "../../dictionaries/en";
import { ReleaseTag, TagList } from "../Tag";
import styles from "./browserMetadata.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browser: FlatBrowser;
};

export function BrowserAvailableOn({ language, dict, browser }: Props) {
  return browser.releases.length > 0 ? (
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
  ) : null;
}
