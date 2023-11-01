"use client";

import type { Browser } from "@updatemybrowser/client";
import { detect } from "@updatemybrowser/detect";
import { Tag } from ".";
import type { Dict } from "../../dictionaries/en";
import styles from "./tag.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browser: Browser;
  detectCurrent?: boolean;
};

export function BrowserTag({
  language,
  dict,
  browser,
  detectCurrent = true,
}: Props) {
  const { browser: detectedBrowser } = detect();

  return (
    <Tag
      current={
        detectCurrent &&
        (browser.matchBrowserName || []).includes(
          detectedBrowser?.name || "no-os",
        )
      }
      href={`/${language}/browsers/${browser.slug.current}`}
    >
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
            alt="Icon"
          />
        </>
      ) : null}
      {browser.name}
    </Tag>
  );
}
