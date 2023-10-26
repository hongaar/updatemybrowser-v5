"use client";

import type { OS } from "@updatemybrowser/client";
import { detect } from "@updatemybrowser/detect";
import { Tag } from ".";
import type { Dict } from "../../dictionaries/en";
import styles from "./tag.module.scss";

type Props = {
  language: string;
  dict: Dict;
  os: OS;
  detectCurrent?: boolean;
};

export function OsTag({ language, dict, os, detectCurrent = true }: Props) {
  const { os: detectedOs } = detect();

  return (
    <Tag
      current={
        detectCurrent && os.matchOsName.includes(detectedOs?.name || "no-os")
      }
      href={`/${language}/browsers/os/${os.slug.current}`}
    >
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
    </Tag>
  );
}
