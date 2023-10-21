"use client";

import type { BrowserWithFlatReleases } from "@updatemybrowser/client";
import {
  hydrateBrowsersWithFlatReleases,
  type MaybeHydratedBrowsersWithFlatReleases,
} from "@updatemybrowser/detect";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import type { Dict } from "../../dictionaries/en";
import { Icon } from "../Icon";
import styles from "./browserGrid.module.scss";

type Props = {
  dict: Dict;
  language: string;
  browsers: BrowserWithFlatReleases[];
};

export function List({ dict, language, browsers }: Props) {
  const [showAllOses, setShowAllOses] = useLocalStorage("showAllOses", false);
  const [hydratedBrowsers, setHydratedBrowsers] =
    useState<MaybeHydratedBrowsersWithFlatReleases[]>(browsers);

  useEffect(
    () => setHydratedBrowsers(hydrateBrowsersWithFlatReleases(browsers)),
    [browsers],
  );

  const browsersToShow = useMemo(() => {
    return showAllOses
      ? hydratedBrowsers
      : hydratedBrowsers.filter(
          (browsers) => browsers.match?.availableOnCurrentOs,
        );
  }, [hydratedBrowsers, showAllOses]);

  return (
    <>
      <div className={styles.toolbar}>
        <h2 className={styles.heading}>{dict.BrowserOverview}</h2>
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
      </div>
      <ul className={styles.browserGrid}>
        {browsersToShow.map((browser) => (
          <li className={styles.gridItem} key={browser._id}>
            <Link
              tabIndex={0}
              aria-current={
                browser.match?.currentBrowser ? ("" as "true") : undefined
              }
              className={`${styles.link} ${
                browser.match?.currentBrowser && browser.match.updateAvailable
                  ? styles.linkUpdateAvailable
                  : ""
              }`}
              href={`/${language}/browsers/${browser.slug.current}`}
            >
              <div className={styles.browserInfo}>
                <h3 className={styles.itemHeading}>{browser.name}</h3>
                <p className={styles.description}>
                  <small>{browser.description[language]}</small>
                </p>
                {browser.icon ? (
                  <Icon icon={browser.icon} size={80} cssSize={"5rem"} />
                ) : null}
              </div>
              <span className={styles.spacer} />
              {browser.match?.currentBrowser ? (
                browser.match?.updateAvailable ? (
                  <span
                    className={`${styles.version} ${styles.versionUpdateAvailable}`}
                  >
                    <span
                      className={`${styles.label} ${styles.versionUpdateAvailable}`}
                    >
                      {dict.UpdateAvailable}
                    </span>
                    <strong className={styles.stat}>
                      {browser.match.currentOsRelease.currentVersion}
                    </strong>
                  </span>
                ) : (
                  <span className={`${styles.version} ${styles.versionLatest}`}>
                    <span className={`${styles.label} ${styles.versionLatest}`}>
                      {dict.YouHaveTheLatestVersion}
                    </span>
                  </span>
                )
              ) : (
                <span className={styles.version}>
                  <span className={styles.label}>{dict.LatestVersion}</span>
                  <strong className={styles.stat}>
                    {browser.match?.highestAvailableVersion}
                  </strong>
                </span>
              )}
            </Link>
          </li>
        ))}
        <li className={styles.clearFloat} />
      </ul>
    </>
  );
}
