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
import styles from "./browserList.module.scss";

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

  console.log({ browsersToShow });

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
      <ul className={styles.browserlist}>
        {browsersToShow.map((browser) => (
          <li className={styles.listItem} key={browser._id}>
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
              href={`/${language}/${browser.slug.current}`}
            >
              <div className={styles.browserInfo}>
                <h3 className={styles.itemHeading}>{browser.name}</h3>
                <p className={styles.description}>
                  <small>
                    {browser.description[language] ??
                      `Web browser by ${browser.vendor}`}
                  </small>
                </p>
                {browser.icon?.predefined?.metadata?.inlineSvg ||
                browser.icon?.custom_svg ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className={styles.img}
                      height={80}
                      width={80}
                      src={`data:image/svg+xml;utf8,${encodeURIComponent(
                        browser.icon?.predefined?.metadata.inlineSvg ||
                          browser.icon?.custom_svg ||
                          "",
                      )}`}
                      alt="Flag"
                    />
                  </>
                ) : null}
              </div>
              <span className={styles.spacer} />
              {browser.match?.currentBrowser ? (
                browser.match?.updateAvailable ? (
                  <span
                    className={`${styles.version} ${styles.versionUpdateAvailable}`}
                  >
                    {dict.UpdateAvailable}:{" "}
                    <strong>
                      {browser.match.currentOsRelease.currentVersion}
                    </strong>
                  </span>
                ) : (
                  <span className={`${styles.version} ${styles.versionLatest}`}>
                    {dict.YouHaveTheLatestVersion}
                  </span>
                )
              ) : (
                <span className={styles.version}>
                  {dict.LatestVersion}:{" "}
                  <strong>{browser.match?.highestAvailableVersion}</strong>
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
