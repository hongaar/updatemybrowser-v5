"use client";

import type { FlatBrowser } from "@updatemybrowser/client";
import {
  hydrateBrowsersWithFlatReleases,
  type MaybeHydratedBrowserWithFlatReleases,
} from "@updatemybrowser/detect";
import Link from "next/link";
import { useEffect, useState } from "react";
import dict from "../../dictionaries/de";
import { Icon } from "../Icon";
import styles from "./browserAlternatives.module.scss";

type Props = {
  language: string;
  browsers: FlatBrowser[];
};

const MAX_ITEMS = 5;

export function List({ language, browsers }: Props) {
  const [hydratedBrowsers, setHydratedBrowsers] =
    useState<MaybeHydratedBrowserWithFlatReleases[]>(browsers);

  useEffect(
    () => setHydratedBrowsers(hydrateBrowsersWithFlatReleases(browsers)),
    [browsers],
  );

  const availableBrowsers = hydratedBrowsers
    .filter((browser) => browser.match?.availableOnCurrentOs)
    .slice(0, MAX_ITEMS);

  return availableBrowsers.length > 0 ? (
    availableBrowsers.map((browser) => (
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
            {browser.description?.find((item) => item._key === language)
              ?.value || ""}
          </small>
        </p>
      </Link>
    ))
  ) : (
    <p className={styles.alternativeBrowser}>{dict.Loading}...</p>
  );
}
