import { sanity, type Release } from "@updatemybrowser/client";
import { updateFromMultiple } from "./version.js";

function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && typeof value !== "undefined";
}

export async function runForAllReleases() {
  const client = sanity.getClient();
  const releases = await sanity.getReleases();

  for (const release of releases) {
    console.log(`Updating release: ${release._id}...`);

    const sources = release.versionSource
      .map(({ source, ...rest }) => {
        if (source === "caniuse" && rest.caniuse_agent) {
          return {
            source,
            agent: rest.caniuse_agent,
            contributeUsage: rest.caniuse_contribute_usage ?? true,
          };
        }

        return null;
      })
      .filter(notEmpty);
    const { version, usage } = await updateFromMultiple(sources);

    const patch = client.patch(release._id);

    if (version) {
      patch.set({ currentVersion: version });
    }

    if (usage) {
      patch.set({ currentUsage: usage });
    }

    await patch
      .commit<Release>()
      .then((release) => {
        console.log("Release updated:", {
          version: release.currentVersion,
          usage: release.currentUsage,
        });
      })
      .catch((err) => {
        console.error("Oh no, the update failed: ", err.message);
      });
  }
}
