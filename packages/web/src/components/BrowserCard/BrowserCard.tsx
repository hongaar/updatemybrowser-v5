import { type BrowserWithFlatReleases } from "@updatemybrowser/client";
import type { MaybeHydratedBrowserWithFlatReleases } from "@updatemybrowser/detect";
import Link from "next/link";
import type { Dict } from "../../dictionaries/en";
import { Icon } from "../Icon";
import styles from "./browserCard.module.scss";

type Props = {
  language: string;
  dict: Dict;
  compact: boolean;
  browser: BrowserWithFlatReleases | MaybeHydratedBrowserWithFlatReleases;
};

export function BrowserCard({
  language,
  compact = false,
  dict,
  browser,
}: Props) {
  const match = "match" in browser ? browser.match : undefined;

  return (
    <Link
      tabIndex={0}
      aria-current={match?.currentBrowser ? ("" as "true") : undefined}
      className={`${styles.link} ${
        match?.currentBrowser && match.updateAvailable
          ? styles.linkUpdateAvailable
          : ""
      }`}
      href={`/${language}/browsers/${browser.slug.current}`}
    >
      <div className={`${styles.browserInfo} ${compact ? styles.compact : ""}`}>
        <h3 className={styles.itemHeading}>{browser.name}</h3>
        {compact ? null : (
          <p className={styles.description}>
            <small>{browser.description[language]}</small>
          </p>
        )}
        {browser.icon ? (
          <Icon
            icon={browser.icon}
            size={80}
            cssSize={compact ? "3rem" : "5rem"}
          />
        ) : null}
      </div>
      <span className={styles.spacer} />
      {compact ? null : match?.currentBrowser ? (
        match?.updateAvailable ? (
          <span
            className={`${styles.version} ${styles.versionUpdateAvailable}`}
          >
            <span
              className={`${styles.label} ${styles.versionUpdateAvailable}`}
            >
              {dict.UpdateAvailable}
            </span>
            <strong className={styles.stat}>
              {match.currentOsRelease.currentVersion}
            </strong>
          </span>
        ) : (
          <span className={`${styles.version} ${styles.versionLatest}`}>
            <span className={`${styles.label} ${styles.versionLatest}`}>
              {dict.YouHaveTheLatestVersion}
            </span>
          </span>
        )
      ) : (
        <span className={styles.version}>
          <span className={styles.label}>{dict.LatestVersion}</span>
          <strong className={styles.stat}>
            {match?.highestAvailableVersion}
          </strong>
        </span>
      )}
    </Link>
  );
}
