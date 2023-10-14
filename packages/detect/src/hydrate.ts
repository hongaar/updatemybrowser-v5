import type { ReleaseExpanded } from "@updatemybrowser/client";
import { coerce, gt } from "semver";
import { detect } from "./detect.js";

export function hydrateExpandedReleases(releases: ReleaseExpanded[]) {
  const { os, browser } = detect();

  return releases.map((item) => {
    const osMatch = item.oses.some((item) => item.matchOsName === os?.name);
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
                  ? gt(
                      coerce(item.currentVersion) || "0",
                      coerce(browser?.version) || "0",
                    )
                  : undefined,
              currentVersion: browser?.version,
            },
          }
        : {}),
    };
  });
}
