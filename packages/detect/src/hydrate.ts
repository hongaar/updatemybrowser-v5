import type {
  FlatBrowser,
  FlatExpandedRelease,
  OS,
  OsVersion,
} from "@updatemybrowser/client";
import { gt, gte, highestVersion, lt, lte } from "@updatemybrowser/core";
import { detect, type DetectedOs } from "./detect.js";

export type MaybeHydratedBrowserWithFlatReleases = FlatBrowser & {
  match?: {
    /**
     * Whether browser matches the detected browser and has a release which
     * matches detected os.
     */
    currentBrowser: boolean;

    /**
     * Whether browser matches the detected browser
     */
    browserMatch: boolean;

    currentOsRelease: FlatExpandedRelease;
    availableOnCurrentOs: boolean;
    highestAvailableVersion: string;
    updateAvailable?: boolean;
    currentVersion?: string;
  };
};

export function matchesOs(osVersion: OsVersion<OS>, os?: DetectedOs) {
  const nameMatch = osVersion.os.matchOsName.includes(os?.name || "no-os");

  if (!nameMatch) {
    return false;
  }

  if (!os?.version) {
    return true;
  }

  if (!osVersion.versionConstraint) {
    return true;
  }

  if (osVersion.versionConstraint.startsWith("<=")) {
    return lte(os.version, osVersion.versionConstraint.replace("<=", ""));
  }

  if (osVersion.versionConstraint.startsWith("<")) {
    return lt(os.version, osVersion.versionConstraint.replace("<", ""));
  }

  if (osVersion.versionConstraint.startsWith(">=")) {
    return gte(os.version, osVersion.versionConstraint.replace(">=", ""));
  }

  if (osVersion.versionConstraint.startsWith(">")) {
    return gt(os.version, osVersion.versionConstraint.replace(">", ""));
  }

  return false;
}

export function hydrateBrowsersWithFlatReleases(browsers: FlatBrowser[]) {
  return browsers.map((item) => hydrateBrowserWithFlatReleases(item));
}

export function hydrateBrowserWithFlatReleases(browser: FlatBrowser) {
  const { os, browser: detectedBrowser } = detect();

  const currentOsRelease = browser.releases?.find((release) =>
    matchesOs(release.os, os),
  );
  const availableOnCurrentOs = !!currentOsRelease;
  const highestAvailableVersion = highestVersion(
    browser.releases?.map((item) => item.currentVersion) || [],
  );
  const browserMatch = (browser.matchBrowserName || []).includes(
    detectedBrowser?.name || "no-browser",
  );

  return {
    ...browser,
    match: {
      currentBrowser: availableOnCurrentOs && browserMatch,
      browserMatch,
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
export function hydrateReleasesFlatExpanded(releases: FlatExpandedRelease[]) {
  const { os, browser } = detect();

  return releases.map((item) => {
    const osMatch = matchesOs(item.os, os);
    const browserMatch = (item.browser.matchBrowserName || []).includes(
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
