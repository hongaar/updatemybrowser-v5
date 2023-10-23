import type {
  BrowserWithFlatReleases,
  ReleaseFlatExpanded,
} from "@updatemybrowser/client";
import { gt, highestVersion } from "@updatemybrowser/core";
import { detect } from "./detect.js";

export type MaybeHydratedBrowserWithFlatReleases = BrowserWithFlatReleases & {
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
  return browsers.map((item) => hydrateBrowserWithFlatReleases(item));
}

export function hydrateBrowserWithFlatReleases(
  browser: BrowserWithFlatReleases,
) {
  const { os, browser: detectedBrowser } = detect();
  const currentOsRelease = browser.releases?.find((release) =>
    release.os.matchOsName.includes(os?.name || "no-os"),
  );
  const availableOnCurrentOs = !!currentOsRelease;
  const highestAvailableVersion = highestVersion(
    browser.releases?.map((item) => item.currentVersion) || [],
  );
  const browserMatch = browser.matchBrowserName.includes(
    detectedBrowser?.name || "no-browser",
  );

  return {
    ...browser,
    match: {
      currentBrowser: availableOnCurrentOs && browserMatch,
      currentOsRelease,
      availableOnCurrentOs,
      highestAvailableVersion,
      updateAvailable:
        availableOnCurrentOs && browserMatch
          ? gt(
              currentOsRelease.currentVersion || "0",
              detectedBrowser!.version || "0",
            )
          : undefined,
      currentVersion:
        availableOnCurrentOs && browserMatch
          ? detectedBrowser!.version
          : undefined,
    },
  } as MaybeHydratedBrowserWithFlatReleases;
}

/**
 * @deprecated
 */
export function hydrateReleasesFlatExpanded(releases: ReleaseFlatExpanded[]) {
  const { os, browser } = detect();

  return releases.map((item) => {
    const osMatch = item.os?.matchOsName.includes(os?.name || "no-os");
    const browserMatch = item.browser.matchBrowserName.includes(
      browser?.name || "no-browser",
    );

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
