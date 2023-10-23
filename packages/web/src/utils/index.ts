import type { BrowserWithFlatReleases } from "@updatemybrowser/client";

export function averageUsage(browser: BrowserWithFlatReleases) {
  const releases = browser.releases.filter(
    (release) => typeof release.currentUsage === "number",
  );

  return releases.length === 0
    ? 0
    : releases.reduce((acc, release) => {
        return acc + (release.currentUsage || 0);
      }, 0) / releases.length;
}

export function compareAverageUsage(
  a: BrowserWithFlatReleases,
  b: BrowserWithFlatReleases,
) {
  return averageUsage(b) > averageUsage(a) ? 1 : -1;
}

export function comparePopularity(
  a: BrowserWithFlatReleases,
  b: BrowserWithFlatReleases,
) {
  return (a.popularity || 0) > (b.popularity || 0) ? -1 : 1;
}
