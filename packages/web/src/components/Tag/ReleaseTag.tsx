"use client";

import type { ReleaseFlatExpanded } from "@updatemybrowser/client";
import { detect, matchesOs } from "@updatemybrowser/detect";
import { Tag } from ".";
import type { Dict } from "../../dictionaries/en";
import styles from "./tag.module.scss";

type Props = {
  language: string;
  dict: Dict;
  release: ReleaseFlatExpanded;
};

export function ReleaseTag({ language, dict, release }: Props) {
  const { os: detectedOs } = detect();

  return (
    <Tag
      current={matchesOs(release.os, detectedOs)}
      href={`/${language}/browsers/os/${release.os.os.slug.current}`}
    >
      {release.os.os.icon?.predefined?.metadata?.inlineSvg ||
      release.os.os.icon?.custom_svg ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.img}
            height={80}
            width={80}
            src={`data:image/svg+xml;utf8,${encodeURIComponent(
              release.os.os.icon?.predefined?.metadata.inlineSvg ||
                release.os.os.icon?.custom_svg ||
                "",
            )}`}
            alt="Icon"
          />
        </>
      ) : null}
      {release.os.os.name}
      <span
        data-tooltip={dict.LatestAvailableVersion}
        className={styles.version}
      >
        {release.currentVersion}
      </span>
    </Tag>
  );
}
