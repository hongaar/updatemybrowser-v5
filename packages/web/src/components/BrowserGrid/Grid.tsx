"use client";

import type { BrowserWithFlatReleases } from "@updatemybrowser/client";
import {
  hydrateBrowsersWithFlatReleases,
  type MaybeHydratedBrowserWithFlatReleases,
} from "@updatemybrowser/detect";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocalStorage } from "usehooks-ts";
import type { Dict } from "../../dictionaries/en";
import { BrowserCard } from "../BrowserCard";
import styles from "./browserGrid.module.scss";

type Props = {
  dict: Dict;
  language: string;
  browsers: BrowserWithFlatReleases[];
  heading?: ReactNode;
  toggleUnavailableBrowsers?: boolean;
};

export function Grid({
  dict,
  language,
  browsers,
  heading = dict.BrowserOverview,
  toggleUnavailableBrowsers = true,
}: Props) {
  const [showAllOses, setShowAllOses] = useLocalStorage("showAllOses", false);
  const [hydratedBrowsers, setHydratedBrowsers] =
    useState<MaybeHydratedBrowserWithFlatReleases[]>(browsers);

  useEffect(
    () => setHydratedBrowsers(hydrateBrowsersWithFlatReleases(browsers)),
    [browsers],
  );

  const browsersToShow = useMemo(() => {
    return showAllOses || !toggleUnavailableBrowsers
      ? hydratedBrowsers
      : hydratedBrowsers.filter(
          (browsers) => browsers.match?.availableOnCurrentOs,
        );
  }, [toggleUnavailableBrowsers, hydratedBrowsers, showAllOses]);

  return (
    <>
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
      <ul className={styles.browserGrid}>
        {browsersToShow.map((browser) => (
          <li className={styles.gridItem} key={browser._id}>
            <BrowserCard language={language} dict={dict} browser={browser} />
          </li>
        ))}
        <li className={styles.clearFloat} />
      </ul>
    </>
  );
}
