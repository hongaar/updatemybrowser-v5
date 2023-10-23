"use client";

import type { BrowserWithFlatReleases } from "@updatemybrowser/client";
import {
  hydrateBrowsersWithFlatReleases,
  type MaybeHydratedBrowserWithFlatReleases,
} from "@updatemybrowser/detect";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "../Icon";
import styles from "./browserAlternatives.module.scss";

type Props = {
  language: string;
  browsers: BrowserWithFlatReleases[];
};

const MAX_ITEMS = 5;

export function List({ language, browsers }: Props) {
  const [hydratedBrowsers, setHydratedBrowsers] =
    useState<MaybeHydratedBrowserWithFlatReleases[]>(browsers);

  useEffect(
    () => setHydratedBrowsers(hydrateBrowsersWithFlatReleases(browsers)),
    [browsers],
  );

  return hydratedBrowsers
    .filter((browser) => browser.match?.availableOnCurrentOs)
    .slice(0, MAX_ITEMS)
    .map((browser) => (
      <Link
        key={browser._id}
        className={styles.alternativeBrowser}
        tabIndex={0}
        href={`/${language}/browsers/${browser.slug.current}`}
      >
        {browser.icon ? (
          <Icon
            icon={browser.icon}
            size={80}
            cssSize="1.2em"
            className={styles.img}
          />
        ) : null}
        <span role="rowheader" className={styles.name}>
          {browser.name}
        </span>
        <p>
          <small className={styles.description}>
            {browser.description[language]}
          </small>
        </p>
      </Link>
    ));
}