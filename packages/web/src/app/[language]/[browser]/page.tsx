import { getBrowsers, getOses, getReleases } from "@updatemybrowser/client";
import { notFound } from "next/navigation";
import { ReleaseTag, TagList } from "../../../components";
import { getDictionary } from "../../../dictionaries";
import type { LanguageParams } from "../page";
import styles from "./browser.module.scss";

type BrowserParams = {
  params: {
    browser: string;
  };
};

export async function generateStaticParams() {
  return (await getBrowsers()).map((browser) => ({ browser: browser.name }));
}

export default async function Browser({
  params: { browser: browserSlug, language },
}: LanguageParams & BrowserParams) {
  const dict = getDictionary(language);
  const browsers = await getBrowsers();
  const oses = await getOses();
  const releases = await getReleases();
  const browser = browsers.find((item) => item.slug.current === browserSlug);

  if (!browser) {
    throw notFound();
  }

  const releasesForBrowser = releases.filter(
    (release) => release.browser._ref === browser._id,
  );

  const averageUsage =
    releasesForBrowser
      .map((release) => release.currentUsage)
      .reduce((a, b) => a + b, 0) / releasesForBrowser.length;

  const availableOnOses = releasesForBrowser.flatMap((release) =>
    release.oses.map((os) => ({
      os: oses.find((item) => item._id === os._ref)!,
      release,
    })),
  );

  return (
    <div>
      <h2>
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
        {browser.name}{" "}
        <span className={styles.vendor}>by {browser.vendor}</span>
      </h2>
      <aside className={styles.alternativesSidebar}>
        <h3>Popular alternatives</h3>
        {/* @todo: show only current os */}
        {browsers
          .sort((a, b) => ((a.popularity || 0) > (b.popularity || 0) ? -1 : 1))
          .filter((item) => item.slug.current !== browserSlug)
          .slice(0, 5)
          .map((browser) => (
            <div key={browser._id} className={styles.alternativeBrowser}>
              {browser.name}
            </div>
          ))}
      </aside>
      <p>[maybe] This is your current browser</p>
      <p>[maybe] Update available, update now!</p>
      <p>[maybe] Available on your platform, install!</p>
      <p>Available versions:</p>
      <TagList>
        {availableOnOses.map(({ os, release }) => (
          <ReleaseTag key={os._id} os={os} release={release} />
        ))}
      </TagList>
      <p>
        Popularity: <strong>❤️ {browser.popularity}</strong>{" "}
        <a
          className={styles.sourceLink}
          href="https://alternativeto.net"
          target="_blank"
          rel="noreferrer"
        >
          source
        </a>
      </p>
      <p>
        Global usage: <strong>{averageUsage.toFixed(2)} %</strong>{" "}
        <a
          className={styles.sourceLink}
          href="https://caniuse.com"
          target="_blank"
          rel="noreferrer"
        >
          source
        </a>
      </p>
    </div>
  );
}
