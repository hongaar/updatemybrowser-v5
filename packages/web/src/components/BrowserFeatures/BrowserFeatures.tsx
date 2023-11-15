import { type FlatBrowser } from "@updatemybrowser/client";
import type { Dict } from "../../dictionaries/en";
import { Icon } from "../Icon";
import styles from "./browserFeatures.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browser: FlatBrowser;
};

export function BrowserFeatures({ language, dict, browser }: Props) {
  return browser.featureCategories.length > 0 ? (
    <div className={styles.features}>
      <ul className={styles.categoryList}>
        {browser.featureCategories.map((featureCategory) => (
          <li key={featureCategory._id} className={styles.category}>
            <h3 className={styles.categoryTitle}>
              {featureCategory.icon ? (
                <Icon
                  mode="svg"
                  icon={featureCategory.icon}
                  className={styles.icon}
                  size={40}
                />
              ) : null}
              {featureCategory.name?.find((item) => item._key === language)
                ?.value || ""}
            </h3>
            <ul className={styles.featureList}>
              {featureCategory.features.map((feature) => (
                <li key={feature._id} className={styles.feature}>
                  <span
                    data-tooltip={
                      feature.description?.find(
                        (item) => item._key === language,
                      )?.value
                    }
                    data-placement="right"
                  >
                    {feature.name?.find((item) => item._key === language)
                      ?.value || ""}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
        <li className={styles.clearFloat} />
      </ul>
    </div>
  ) : null;
}
