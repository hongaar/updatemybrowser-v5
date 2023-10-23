"use client";

import { detect } from "@updatemybrowser/detect";
import type { Dict } from "../../dictionaries/en";
import styles from "./environment.module.scss";

type Props = {
  language: string;
  dict: Dict;
};

export function Environment({ language, dict }: Props) {
  const detected = detect();

  return (
    <section className={styles.environment}>
      <h3>{dict.CheckDetails}</h3>
      <ul>
        <li>
          {dict.YourBrowser}: {detected.browser?.name || "No browser detected"}{" "}
          {detected.browser?.version || "(no browser version detected)"}
        </li>
        <li>
          {dict.YourOS}: {detected.os?.name || "No OS detected"}{" "}
          {detected.os?.version || "(no OS version detected)"}
        </li>
      </ul>
    </section>
  );
}
