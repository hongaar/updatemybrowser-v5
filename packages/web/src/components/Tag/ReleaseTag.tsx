"use client";

import type { OS, Release } from "@updatemybrowser/client";
import { detect } from "@updatemybrowser/detect";
import { Tag } from ".";
import styles from "./tag.module.scss";

type Props = {
  os: OS;
  release: Release;
};

export function ReleaseTag({ os, release }: Props) {
  const { os: detectedOs } = detect();

  return (
    <Tag className={os.matchOsName === detectedOs?.name ? styles.current : ""}>
      {os.icon?.predefined?.metadata?.inlineSvg || os.icon?.custom_svg ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.img}
            height={80}
            width={80}
            src={`data:image/svg+xml;utf8,${encodeURIComponent(
              os.icon?.predefined?.metadata.inlineSvg ||
                os.icon?.custom_svg ||
                "",
            )}`}
            alt="Icon"
          />
        </>
      ) : null}
      {os.name}
      <span className={styles.version}>{release.currentVersion}</span>
    </Tag>
  );
}
