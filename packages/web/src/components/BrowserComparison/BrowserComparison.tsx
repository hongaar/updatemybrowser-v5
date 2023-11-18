"use client";

import type {
  Feature,
  FeatureCategory,
  FlatBrowser,
  OS,
} from "@updatemybrowser/client";
import {
  hydrateBrowsersWithFlatReleases,
  type MaybeHydratedBrowserWithFlatReleases,
} from "@updatemybrowser/detect";
import Link from "next/link";
import { Fragment, useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocalStorage } from "usehooks-ts";
import type { Dict } from "../../dictionaries/en";
import { BrowserOverviewHeading } from "../BrowserOverviewHeading";
import { Icon } from "../Icon";
import styles from "./browserComparison.module.scss";

type Props = {
  language: string;
  dict: Dict;
  heading?: ReactNode;
  intro?: ReactNode;
  toggleUnavailableBrowsers?: boolean;
  browsers: FlatBrowser[];
  oses: OS[];
  featureCategories: FeatureCategory[];
  features: Feature[];
};

export function BrowserComparison({
  language,
  dict,
  heading = dict.BrowserOverview,
  intro,
  toggleUnavailableBrowsers = true,
  browsers,
  oses,
  featureCategories,
  features,
}: Props) {
  const [showAllOses, setShowAllOses] = useLocalStorage("showAllOses", false);
  const [hydratedBrowsers, setHydratedBrowsers] =
    useState<MaybeHydratedBrowserWithFlatReleases[]>(browsers);

  useEffect(
    () => setHydratedBrowsers(hydrateBrowsersWithFlatReleases(browsers)),
    [browsers],
  );

  const filteredBrowsers = useMemo(() => {
    return showAllOses || !toggleUnavailableBrowsers
      ? hydratedBrowsers
      : hydratedBrowsers.filter(
          (browsers) => browsers.match?.availableOnCurrentOs,
        );
  }, [toggleUnavailableBrowsers, hydratedBrowsers, showAllOses]);

  const browsersToShow =
    filteredBrowsers.length > 0 ? filteredBrowsers : browsers;

  return (
    <>
      <BrowserOverviewHeading
        language={language}
        dict={dict}
        heading={heading}
        intro={intro}
        toggleUnavailableBrowsers={toggleUnavailableBrowsers}
        showAllOses={showAllOses}
        setShowAllOses={setShowAllOses}
      />
      <div className={styles.tableWrapper}>
        <table className={styles.featureTable}>
          <thead>
            <tr>
              <td />
              {browsersToShow.map((browser) => (
                <th className={styles.browserHeader} key={browser._id}>
                  <Link
                    tabIndex={0}
                    href={`/${language}/browsers/${browser.slug.current}`}
                  >
                    <h3>
                      {browser.icon ? (
                        <Icon
                          alt={browser.name}
                          icon={browser.icon}
                          size={40}
                          cssSize={"2rem"}
                        />
                      ) : null}{" "}
                      {browser.name}
                    </h3>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureCategories.map((featureCategory) => (
              <Fragment key={featureCategory._id}>
                <tr>
                  <th className={styles.categoryHeader}>
                    {featureCategory.icon ? (
                      <Icon
                        mode="svg"
                        icon={featureCategory.icon}
                        className={styles.categoryIcon}
                        size={40}
                        cssSize={"2rem"}
                      />
                    ) : null}
                    {featureCategory.name?.find(
                      (item) => item._key === language,
                    )?.value || ""}
                  </th>
                  {browsersToShow.map((browser) => (
                    <td key={browser._id} />
                  ))}
                </tr>
                {features
                  .filter(
                    (feature) => feature.category._ref === featureCategory._id,
                  )
                  .map((feature) => (
                    <tr key={feature._id}>
                      <th className={styles.featureHeader}>
                        <span
                          data-tooltip={
                            feature.description?.find(
                              (item) => item._key === language,
                            )?.value
                          }
                          data-placement="right"
                        >
                          {feature.name?.find((item) => item._key === language)
                            ?.value || ""}
                        </span>
                      </th>
                      {browsersToShow.map((browser) => (
                        <td className={styles.featureCell} key={browser._id}>
                          {browser.features
                            ?.map((feature) => feature._ref)
                            .includes(feature._id)
                            ? "✅"
                            : "❌"}
                        </td>
                      ))}
                    </tr>
                  ))}
              </Fragment>
            ))}
            <tr>
              <th className={styles.categoryHeader}>{dict.OperatingSystems}</th>
              {browsersToShow.map((browser) => (
                <td key={browser._id} />
              ))}
            </tr>
            {oses.map((os) => (
              <tr key={os._id}>
                <th className={styles.featureHeader}>
                  {os.icon ? (
                    <Icon
                      mode="svg"
                      icon={os.icon}
                      className={styles.osIcon}
                      size={20}
                      cssSize={"1rem"}
                    />
                  ) : null}
                  {os.name}
                </th>
                {browsersToShow.map((browser) => (
                  <td className={styles.featureCell} key={browser._id}>
                    {browser.releases.find(
                      (release) => release.os.os._id === os._id,
                    ) ? (
                      <Link
                        tabIndex={0}
                        href={`/${language}/browsers/${browser.slug.current}/${os.slug.current}/download`}
                      >
                        ✅
                      </Link>
                    ) : (
                      "❌"
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
