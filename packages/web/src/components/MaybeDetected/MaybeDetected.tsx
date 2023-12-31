import type { FlatBrowser } from "@updatemybrowser/client";
import { sprintf } from "sprintf-js";
import type { Dict } from "../../dictionaries/en";
import { BrowserCard } from "../BrowserCard";
import styles from "./maybeDetected.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browsers: FlatBrowser[];
  browser: FlatBrowser;
};

export function MaybeDetected({ language, dict, browser, browsers }: Props) {
  const maybeBrowsers = browsers.filter((item) => {
    return item.maybeDetectedAs?.some((maybe) => maybe._ref === browser._id);
  });

  if (maybeBrowsers.length === 0) {
    return null;
  }

  return (
    <section>
      <h3>{dict.ButMaybeYouAreUsing}</h3>
      <p>{sprintf(dict.DisguisedBrowsersDescription, browser.name)}</p>
      <ul className={styles.browserGrid}>
        {maybeBrowsers.map((browser) => (
          <li className={styles.gridItem} key={browser._id}>
            <BrowserCard
              small
              language={language}
              dict={dict}
              browser={browser}
            />
          </li>
        ))}
        <li className={styles.clearFloat} />
      </ul>
    </section>
  );
}
