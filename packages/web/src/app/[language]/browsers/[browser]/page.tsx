import {
  getBrowsers,
  getBrowsersWithFlatReleases,
} from "@updatemybrowser/client";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import {
  BrowserMetadata,
  LatestVersion,
  TryBanner,
  UpdateAvailable,
} from "../../../../components/Browser";
import { BrowserAlternatives } from "../../../../components/BrowserAlternatives";
import { Container } from "../../../../components/Container";
import { Icon } from "../../../../components/Icon";
import { ExternalLink } from "../../../../components/Link";
import { getDictionary } from "../../../../dictionaries";
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
  const browsers = await getBrowsersWithFlatReleases();
  const browser = browsers.find((item) => item.slug.current === browserSlug);

  if (!browser) {
    throw notFound();
  }

  return (
    <>
      <Breadcrumbs
        language={language}
        segments={[
          { label: dict.BrowserOverview, path: "/browsers" },
          { label: browser.name },
        ]}
      />
      <Container>
        <h2>
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
        <BrowserAlternatives language={language} exclude={browser} />
        <p>
          Microsoft Edge is a proprietary, cross-platform web browser created by
          Microsoft. It was first released in 2015 as part of Windows 10 and
          Xbox One and later ported to other platforms as a fork of
          Google&apos;s Chromium open-source project: Android and iOS, macOS,
          older Windows versions, and most recently Linux.
          <br />
          <ExternalLink href="https://en.wikipedia.org/wiki/Microsoft_Edge">
            Wikipedia
          </ExternalLink>
        </p>
        <BrowserMetadata language={language} browser={browser} />
      </Container>
    </>
  );
}
