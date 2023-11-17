import { type FlatBrowser } from "@updatemybrowser/client";
import type { Dict } from "../../dictionaries/en";
import { BrowserAlternatives } from "../BrowserAlternatives";
import {
  LatestVersion,
  NotAvailable,
  TryBanner,
  UpdateAvailable,
} from "../BrowserBanners";
import { LoadingBanners } from "../BrowserBanners/LoadingBanners";
import { BrowserFeatures } from "../BrowserFeatures";
import { BrowserGallery } from "../BrowserGallery";
import {
  BrowserAvailableOn,
  BrowserMetadataList,
  BrowserUsage,
  willShowBrowserUsage,
} from "../BrowserMetadata";
import { Callout } from "../Callout";
import { AdUnit, Slots } from "../GoogleAdSense";
import { Icon } from "../Icon";
import { ExternalLink } from "../Link";
import styles from "./browserPage.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browsers: FlatBrowser[];
  browser: FlatBrowser;
  headingPrefix?: string;
  showMetadata?: boolean;
};

export function BrowserPage({
  language,
  dict,
  browsers,
  browser,
  headingPrefix,
  showMetadata = true,
}: Props) {
  const description = browser.description?.find(
    (item) => item._key === language,
  )?.value;
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
      <AdUnit slot={Slots.BrowserPage} />
      {showMetadata ? (
        <BrowserMetadataList>
          <BrowserAvailableOn
            language={language}
            dict={dict}
            browser={browser}
          />
        </BrowserMetadataList>
      ) : null}
      <section className={styles.columns}>
        <article>
          <LoadingBanners language={language} dict={dict} />
          <UpdateAvailable language={language} dict={dict} browser={browser} />
          <LatestVersion language={language} dict={dict} browser={browser} />
          <TryBanner language={language} dict={dict} browser={browser} />
          <NotAvailable language={language} dict={dict} browser={browser} />
          <BrowserGallery language={language} dict={dict} browser={browser} />
          {description ? <p className={styles.excerpt}>{description}</p> : null}
          {summary && wikipediaUrl ? (
            <p>
              {browser.summary?.find((item) => item._key === language)?.value ||
                ""}
              <br />
              <ExternalLink href={wikipediaUrl} small>
                Wikipedia
              </ExternalLink>
            </p>
          ) : null}
          {showMetadata && willShowBrowserUsage(browser) ? (
            <BrowserMetadataList>
              <BrowserUsage language={language} dict={dict} browser={browser} />
            </BrowserMetadataList>
          ) : null}
          <BrowserFeatures language={language} dict={dict} browser={browser} />
          <Callout href={`/${language}/browsers/comparison`}>
            <h3>🏷️ {dict.BrowserFeaturesComparison}</h3>
            <p>{dict.BrowserFeaturesComparisonDescription}</p>
          </Callout>
        </article>
        <BrowserAlternatives
          language={language}
          dict={dict}
          browsers={browsers}
          exclude={browser}
        />
      </section>
    </>
  );
}
