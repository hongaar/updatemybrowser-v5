"use client";

import type { FlatBrowser } from "@updatemybrowser/client";
import {
  hydrateBrowsersWithFlatReleases,
  type MaybeHydratedBrowserWithFlatReleases,
} from "@updatemybrowser/detect";
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocalStorage } from "usehooks-ts";
import type { Dict } from "../../dictionaries/en";
import { BrowserOverviewHeading } from "../BrowserOverviewHeading";
import { Icon } from "../Icon";
import { ReleaseTag, TagList } from "../Tag";
import styles from "./browserList.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browsers: FlatBrowser[];
  heading?: ReactNode;
  intro?: ReactNode;
  toggleUnavailableBrowsers?: boolean;
};

export function BrowserList({
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

  const filteredBrowsers = useMemo(() => {
    return showAllOses || !toggleUnavailableBrowsers
      ? hydratedBrowsers
      : hydratedBrowsers.filter(
          (browsers) => browsers.match?.availableOnCurrentOs,
        );
  }, [toggleUnavailableBrowsers, hydratedBrowsers, showAllOses]);

  const browsersToShow =
    filteredBrowsers.length > 0 ? filteredBrowsers : browsers;

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
      <ul className={styles.browserList}>
        {browsersToShow.map((browser) => (
          <li className={styles.listItem} key={browser._id}>
            <div className={styles.icon}>
              {browser.icon ? (
                <Icon icon={browser.icon} size={80} cssSize={"5rem"} />
              ) : null}
            </div>
            <div className={styles.browserInfo}>
              <h3 className={styles.itemHeading}>
                <span className={styles.inlineIcon}>
                  {browser.icon ? (
                    <Icon icon={browser.icon} size={40} cssSize={"2rem"} />
                  ) : null}
                </span>
                {browser.name}
              </h3>
              <p className={styles.description}>
                {browser.description?.find((item) => item._key === language)
                  ?.value || ""}
              </p>
              <TagList>
                {browser.releases.map((release, index) => (
                  <ReleaseTag
                    language={language}
                    key={index}
                    dict={dict}
                    release={release}
                  />
                ))}
              </TagList>
              <Link
                role="button"
                tabIndex={0}
                className={`${styles.link} muted`}
                href={`/${language}/browsers/${browser.slug.current}`}
              >
                {dict.MoreInformation}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
