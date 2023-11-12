import { type FlatBrowser } from "@updatemybrowser/client";
import type { MaybeHydratedBrowserWithFlatReleases } from "@updatemybrowser/detect";
import Link from "next/link";
import type { Dict } from "../../dictionaries/en";
import { Icon } from "../Icon";
import styles from "./browserCard.module.scss";

type Props = {
  language: string;
  dict: Dict;
  medium?: boolean;
  small?: boolean;
  browser: FlatBrowser | MaybeHydratedBrowserWithFlatReleases;
};

export function BrowserCard({
  language,
  medium = false,
  small = false,
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
      <div
        className={`${styles.browserInfo} ${
          medium ? styles.medium : small ? styles.small : ""
        }`}
      >
        <h3 className={styles.itemHeading}>{browser.name}</h3>
        {medium || small ? null : (
          <p className={styles.description}>
            <small>
              {browser.description?.find((item) => item._key === language)
                ?.value || ""}
            </small>
          </p>
        )}
        {browser.icon ? (
          <Icon
            icon={browser.icon}
            size={80}
            cssSize={medium ? "3rem" : small ? "2rem" : "5rem"}
          />
        ) : null}
      </div>
      <span className={styles.spacer} />
      {medium || small ? null : match?.currentBrowser ? (
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
