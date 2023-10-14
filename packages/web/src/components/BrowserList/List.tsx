"use client";

import type { ReleaseExpanded } from "@updatemybrowser/client";
import { hydrateExpandedReleases } from "@updatemybrowser/detect";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Dict } from "../../dictionaries/en";
import styles from "./browserList.module.scss";

type Props = {
  dict: Dict;
  language: string;
  releases: ReleaseExpanded[];
};

function toSimpleVersionString(version: string) {
  const components = version.split(".").slice(0, 2).map(Number);

  if (components.length === 0) {
    return "0";
  }

  if (components[2] && components[2] !== 0) {
    return components.join(".");
  }

  if (components[1] && components[1] !== 0) {
    return `${components[0]}.${components[1]}`;
  }

  return components[0].toString();
}

export function List({ dict, language, releases }: Props) {
  const [showAllOses, setShowAllOses] = useState(false);
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
        <label>
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
              aria-current={release.match?.current ? ("" as "true") : undefined}
              className={styles.link}
              href={`/${language}/${release.browser.slug.current}`}
            >
              <h3 className={styles.itemHeading}>{release.browser.name}</h3>
              <span className={styles.version}>
                Latest version {release.currentVersion}
              </span>
              {release.match?.current && release.match.currentVersion ? (
                <span className={styles.version}>
                  Your version{" "}
                  {toSimpleVersionString(release.match.currentVersion)}
                </span>
              ) : null}
              {release.match?.updateAvailable ? (
                <span className={styles.updateAvailable}>Update available</span>
              ) : null}
              {release.browser.icon?.metadata?.inlineSvg ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.img}
                    height={80}
                    width={80}
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(
                      release.browser.icon?.metadata.inlineSvg,
                    )}`}
                    alt="Flag"
                  />
                </>
              ) : null}
              <p className={styles.description}>
                {release.browser.description[language]}
              </p>
            </Link>
          </li>
        ))}
        <li className={styles.clearFloat} />
      </ul>
    </>
  );
}
