import { type FlatBrowser } from "@updatemybrowser/client";
import type { Dict } from "../../dictionaries/en";
import { comparePopularity } from "../../utils";
import { List } from "./List";
import styles from "./browserAlternatives.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browsers: FlatBrowser[];
  exclude: FlatBrowser;
};

export function BrowserAlternatives({
  language,
  dict,
  browsers,
  exclude,
}: Props) {
  return (
    <aside className={styles.browserAlternatives}>
      <h3 className={styles.heading}>{dict.PopularAlternatives}</h3>
      <div className={styles.list}>
        <List
          language={language}
          browsers={browsers
            .sort(comparePopularity)
            .filter((item) => item._id !== exclude._id)}
        />
      </div>
    </aside>
  );
}
