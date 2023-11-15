import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Dict } from "../../dictionaries/en";
import styles from "./browserOverviewHeading.module.scss";

type Props = {
  language: string;
  dict: Dict;
  heading: ReactNode;
  intro?: ReactNode;
  toggleUnavailableBrowsers?: boolean;
  showAllOses: boolean;
  setShowAllOses: Dispatch<SetStateAction<boolean>>;
};

export function BrowserOverviewHeading({
  language,
  dict,
  heading,
  toggleUnavailableBrowsers,
  showAllOses,
  setShowAllOses,
  intro,
}: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.toolbar}>
        <h2 className={styles.heading}>{heading}</h2>
        {toggleUnavailableBrowsers ? (
          <label className={styles.showReleasesForAllOses}>
            <input
              type="checkbox"
              checked={showAllOses}
              onChange={(e) => {
                setShowAllOses(e.target.checked);
              }}
            />{" "}
            {dict.ShowReleasesForAllOses}
          </label>
        ) : null}
      </div>
      {intro ? intro : null}
    </header>
  );
}
