"use client";

import type { ReleaseExpanded } from "@updatemybrowser/client";
import { hydrateExpandedReleases } from "@updatemybrowser/detect";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import type { Dict } from "../../dictionaries/en";
import styles from "./browserList.module.scss";

type Props = {
  dict: Dict;
  language: string;
  releases: ReleaseExpanded[];
};

export function List({ dict, language, releases }: Props) {
  const [showAllOses, setShowAllOses] = useLocalStorage("showAllOses", false);
  const [hydratedReleases, setHydratedReleases] = useState(releases);

  useEffect(
    () => setHydratedReleases(hydrateExpandedReleases(releases)),
    [releases],
  );

  const releasesToShow = useMemo(() => {
    return showAllOses
      ? hydratedReleases
      : hydratedReleases.filter((release) => release.match?.os);
  }, [hydratedReleases, showAllOses]);

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
        {releasesToShow.map((release) => (
          <li className={styles.listItem} key={release._id}>
            <Link
              tabIndex={0}
              aria-current={release.match?.current ? ("" as "true") : undefined}
              className={`${styles.link} ${
                release.match?.current && release.match.updateAvailable
                  ? styles.linkUpdateAvailable
                  : ""
              }`}
              href={`/${language}/${release.browser.slug.current}`}
            >
              <div className={styles.browserInfo}>
                <h3 className={styles.itemHeading}>{release.browser.name}</h3>
                <p className={styles.description}>
                  <small>
                    {release.browser.description[language] ??
                      `Web browser by ${release.browser.vendor}`}
                  </small>
                </p>
                {release.browser.icon?.predefined?.metadata?.inlineSvg ||
                release.browser.icon?.custom_svg ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className={styles.img}
                      height={80}
                      width={80}
                      src={`data:image/svg+xml;utf8,${encodeURIComponent(
                        release.browser.icon?.predefined?.metadata.inlineSvg ||
                          release.browser.icon?.custom_svg ||
                          "",
                      )}`}
                      alt="Flag"
                    />
                  </>
                ) : null}
              </div>
              <span className={styles.spacer} />
              {release.match?.current ? (
                release.match?.updateAvailable ? (
                  <span
                    className={`${styles.version} ${styles.versionUpdateAvailable}`}
                  >
                    {dict.UpdateAvailable}:{" "}
                    <strong>{release.currentVersion}</strong>
                  </span>
                ) : (
                  <span className={`${styles.version} ${styles.versionLatest}`}>
                    {dict.YouHaveTheLatestVersion}
                  </span>
                )
              ) : (
                <span className={styles.version}>
                  {dict.LatestVersion}:{" "}
                  <strong>{release.currentVersion}</strong>
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
