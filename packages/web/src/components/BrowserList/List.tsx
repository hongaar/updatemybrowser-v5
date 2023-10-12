"use client";

import { detect } from "@updatemybrowser/client";
import type { SanityRelease } from "@updatemybrowser/core";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Dict } from "../../dictionaries/en";
import styles from "./browserList.module.scss";

type Props = {
  dict: Dict;
  language: string;
  releases: SanityRelease[];
};

export function List({ dict, language, releases }: Props) {
  const [showAll, setShowAll] = useState(true);
  const { os } = useMemo(() => detect(), []);
  const releasesToShow = useMemo(() => {
    return showAll
      ? releases
      : releases.filter((release) =>
          release.oses.some((releaseOs) => releaseOs.matchOsName === os?.name),
        );
  }, [os, releases, showAll]);

  return (
    <>
      <div className={styles.toolbar}>
        <h2 className={styles.heading}>{dict.BrowserOverview}</h2>
        <label>
          <input
            type="checkbox"
            checked={showAll}
            onChange={(e) => {
              setShowAll(e.target.checked);
            }}
          />{" "}
          {dict.ShowReleasesForAllOses}
        </label>
      </div>
      <ul className={styles.browserlist}>
        {releasesToShow.map((release) => (
          <li className={styles.listItem} key={release._id}>
            <Link
              aria-current={
                release.browser.name === "Chrome" ? ("" as "true") : undefined
              }
              className={styles.link}
              href={`/${language}/${release.browser.slug.current}`}
            >
              <h3 className={styles.itemHeading}>{release.browser.name}</h3>
              <span className={styles.version}>
                Version {release.currentVersion}
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.img}
                height={80}
                width={80}
                src={`data:image/svg+xml;utf8,${encodeURIComponent(
                  release.browser.icon?.metadata?.inlineSvg,
                )}`}
                alt="Flag"
              />
              <p className={styles.description}>
                {release.browser.description}
              </p>
            </Link>
          </li>
        ))}
        <li className={styles.clearFloat} />
      </ul>
    </>
  );
}
