import {
  getBrowsers,
  getExpandedBrowsers,
  getOses,
} from "@updatemybrowser/client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sprintf } from "sprintf-js";
import { Breadcrumbs } from "../../../../../components/Breadcrumbs";
import { BrowserGrid } from "../../../../../components/BrowserGrid";
import { Container } from "../../../../../components/Container";
import { Icon } from "../../../../../components/Icon";
import { getDictionary } from "../../../../../dictionaries";
import { compareAverageUsage, pageTitle } from "../../../../../utils";
import type { LanguageParams } from "../../../route";
import styles from "./page.module.scss";

export type OsParams = {
  params: {
    os: string;
  };
};

export async function generateStaticParams() {
  return (await getBrowsers()).map((browser) => ({ browser: browser.name }));
}

export async function generateMetadata({
  params: { os: osSlug, language },
}: LanguageParams & OsParams) {
  const dict = getDictionary(language);
  const oses = await getOses();
  const os = oses.find((item) => item.slug.current === osSlug);

  return {
    title: pageTitle(`${sprintf(dict.BrowsersForOperatingSystem, os?.name)}`),
  } as Metadata;
}

export default async function Browser({
  params: { os: osSlug, language },
}: LanguageParams & OsParams) {
  const dict = getDictionary(language);
  const oses = await getOses();
  const os = oses.find((item) => item.slug.current === osSlug);

  if (!os) {
    throw notFound();
  }

  const browsers = (await getExpandedBrowsers())
    .filter((item) => {
      return item.releases.some((release) => release.os.os._id === os?._id);
    })
    .sort(compareAverageUsage);

  return (
    <>
      <Breadcrumbs
        language={language}
        segments={[
          { label: dict.BrowserOverview, path: "/browsers" },
          { label: `${dict.BrowsersForOperatingSystem} ${os?.name}` },
        ]}
      />
      <Container>
        <BrowserGrid
          language={language}
          browsers={browsers}
          heading={
            <>
              {dict.BrowsersForOperatingSystem}{" "}
              {os.icon ? (
                <Icon
                  icon={os.icon}
                  size={80}
                  cssSize="1.2em"
                  className={styles.img}
                />
              ) : null}{" "}
              {os?.name}
            </>
          }
          toggleUnavailableBrowsers={false}
        />
      </Container>
    </>
  );
}
