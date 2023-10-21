import {
  comparePopularity,
  getBrowsersWithFlatReleases,
  type BrowserWithFlatReleases,
} from "@updatemybrowser/client";
import { getDictionary } from "../../dictionaries";
import { List } from "./List";
import styles from "./browserAlternatives.module.scss";

type Props = {
  language: string;
  exclude: BrowserWithFlatReleases;
};

export async function BrowserAlternatives({ language, exclude }: Props) {
  const dict = getDictionary(language);
  const browsers = (await getBrowsersWithFlatReleases())
    .sort(comparePopularity)
    .filter((item) => item._id !== exclude._id);

  return (
    <aside className={styles.browserAlternatives}>
      <h3>{dict.PopularAlternatives}</h3>
      <List language={language} browsers={browsers} />
    </aside>
  );
}
