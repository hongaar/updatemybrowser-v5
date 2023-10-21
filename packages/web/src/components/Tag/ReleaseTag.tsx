"use client";

import type { ReleaseFlatExpanded } from "@updatemybrowser/client";
import { detect } from "@updatemybrowser/detect";
import { Tag } from ".";
import styles from "./tag.module.scss";

type Props = {
  release: ReleaseFlatExpanded;
};

export function ReleaseTag({ release }: Props) {
  const { os: detectedOs } = detect();
  return (
    <Tag
      className={
        release.os.matchOsName === detectedOs?.name ? styles.current : ""
      }
    >
      {release.os.icon?.predefined?.metadata?.inlineSvg ||
      release.os.icon?.custom_svg ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.img}
            height={80}
            width={80}
            src={`data:image/svg+xml;utf8,${encodeURIComponent(
              release.os.icon?.predefined?.metadata.inlineSvg ||
                release.os.icon?.custom_svg ||
                "",
            )}`}
            alt="Icon"
          />
        </>
      ) : null}
      {release.os.name}
      <span className={styles.version}>{release.currentVersion}</span>
    </Tag>
  );
}
