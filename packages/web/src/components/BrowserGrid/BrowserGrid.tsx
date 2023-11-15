"use client";

import type { FlatBrowser } from "@updatemybrowser/client";
import {
  hydrateBrowsersWithFlatReleases,
  type MaybeHydratedBrowserWithFlatReleases,
} from "@updatemybrowser/detect";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocalStorage } from "usehooks-ts";
import type { Dict } from "../../dictionaries/en";
import { BrowserCard } from "../BrowserCard";
import { BrowserOverviewHeading } from "../BrowserOverviewHeading";
import styles from "./browserGrid.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browsers: FlatBrowser[];
  heading?: ReactNode;
  intro?: ReactNode;
  toggleUnavailableBrowsers?: boolean;
};

export function BrowserGrid({
  language,
  dict,
  browsers,
  heading = dict.BrowserOverview,
  intro,
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
      <BrowserOverviewHeading
        language={language}
        dict={dict}
        heading={heading}
        intro={intro}
        toggleUnavailableBrowsers={toggleUnavailableBrowsers}
        showAllOses={showAllOses}
        setShowAllOses={setShowAllOses}
      />
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
