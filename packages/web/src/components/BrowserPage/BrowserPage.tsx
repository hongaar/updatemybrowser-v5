import { type BrowserWithFlatReleases } from "@updatemybrowser/client";
import type { Dict } from "../../dictionaries/en";
import { BrowserAlternatives } from "../BrowserAlternatives";
import {
  LatestVersion,
  NotAvailable,
  TryBanner,
  UpdateAvailable,
} from "../BrowserBanners";
import { BrowserMetadata } from "../BrowserMetadata";
import { Icon } from "../Icon";
import { ExternalLink } from "../Link";
import styles from "./browserPage.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browsers: BrowserWithFlatReleases[];
  browser: BrowserWithFlatReleases;
  headingPrefix?: string;
};

export function BrowserPage({
  language,
  dict,
  browsers,
  browser,
  headingPrefix,
}: Props) {
  const summary = browser.summary?.find((item) => item._key === language)
    ?.value;
  const wikipediaUrl = browser.wikipediaUrl?.find(
    (item) => item._key === language,
  )?.value;

  return (
    <>
      <h2>
        {headingPrefix ? <span>{headingPrefix}:</span> : null}
        {browser.icon ? (
          <Icon
            icon={browser.icon}
            size={80}
            cssSize="1.2em"
            className={styles.img}
          />
        ) : null}
        {browser.name}{" "}
        <span className={styles.vendor}>
          {dict.By} {browser.vendor}
        </span>
      </h2>
      <UpdateAvailable language={language} dict={dict} browser={browser} />
      <LatestVersion language={language} dict={dict} browser={browser} />
      <TryBanner language={language} dict={dict} browser={browser} />
      <NotAvailable language={language} dict={dict} browser={browser} />
      <div className={styles.alternativesWrapper}>
        <BrowserAlternatives
          language={language}
          dict={dict}
          browsers={browsers}
          exclude={browser}
        />
        <div>
          {summary && wikipediaUrl ? (
            <p>
              {browser.summary?.find((item) => item._key === language)?.value ||
                ""}
              <br />
              <ExternalLink href={wikipediaUrl}>Wikipedia</ExternalLink>
            </p>
          ) : null}
          <BrowserMetadata language={language} dict={dict} browser={browser} />
        </div>
      </div>
    </>
  );
}
