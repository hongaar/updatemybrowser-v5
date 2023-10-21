import {
  getBrowsers,
  getBrowsersWithFlatReleases,
} from "@updatemybrowser/client";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import { BrowserMetadata } from "../../../../components/Browser";
import { BrowserAlternatives } from "../../../../components/BrowserAlternatives";
import { Container } from "../../../../components/Container";
import { Icon } from "../../../../components/Icon";
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
        <BrowserAlternatives language={language} exclude={browser} />
        <p>[maybe] This is your current browser</p>
        <p>[maybe] Update available, update now!</p>
        <p>[maybe] Available on your platform, install!</p>
        <BrowserMetadata language={language} browser={browser} />
      </Container>
    </>
  );
}
