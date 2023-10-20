import type {
  BrowserWithFlatReleases,
  ReleaseFlatExpanded,
} from "@updatemybrowser/client";
import { gt, highestVersion } from "@updatemybrowser/core";
import { detect } from "./detect.js";

export type MaybeHydratedBrowsersWithFlatReleases = BrowserWithFlatReleases & {
  match?: {
    currentBrowser: boolean;
    currentOsRelease: ReleaseFlatExpanded;
    availableOnCurrentOs: boolean;
    highestAvailableVersion: string;
    updateAvailable?: boolean;
    currentVersion?: string;
  };
};

export function hydrateBrowsersWithFlatReleases(
  browsers: BrowserWithFlatReleases[],
) {
  const { os, browser } = detect();

  return browsers.map((item) => {
    const currentOsRelease = item.releases?.find(
      (release) => release.os?.matchOsName === os?.name,
    );
    const availableOnCurrentOs = !!currentOsRelease;
    const highestAvailableVersion = highestVersion(
      item.releases?.map((item) => item.currentVersion) || [],
    );
    const browserMatch = item.matchBrowserName === browser?.name;

    return {
      ...item,
      match: {
        currentBrowser: availableOnCurrentOs && browserMatch,
        currentOsRelease,
        availableOnCurrentOs,
        highestAvailableVersion,
        updateAvailable:
          availableOnCurrentOs && browserMatch
            ? gt(currentOsRelease.currentVersion || "0", browser.version || "0")
            : undefined,
        currentVersion:
          availableOnCurrentOs && browserMatch ? browser.version : undefined,
      },
    };
  }) as MaybeHydratedBrowsersWithFlatReleases[];
}

export function hydrateReleasesFlatExpanded(releases: ReleaseFlatExpanded[]) {
  const { os, browser } = detect();

  return releases.map((item) => {
    const osMatch = item.os?.matchOsName === os?.name;
    const browserMatch = item.browser.matchBrowserName === browser?.name;

    return {
      ...item,
      ...(osMatch || browserMatch
        ? {
            match: {
              current: osMatch && browserMatch,
              os: osMatch,
              browser: browserMatch,
              updateAvailable:
                osMatch && browserMatch
                  ? gt(item.currentVersion || "0", browser?.version || "0")
                  : undefined,
              currentVersion: browser?.version,
            },
          }
        : {}),
    };
  });
}
