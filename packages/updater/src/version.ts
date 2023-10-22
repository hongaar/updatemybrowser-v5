import { highestVersion, toSimpleVersionString } from "@updatemybrowser/core";
import { caniuse, wikipedia } from "./versionSource/index.js";

type CanIUseParams = {
  source: "caniuse";
} & Parameters<typeof caniuse>[0];

type WikipediaParams = {
  source: "wikipedia";
} & Parameters<typeof wikipedia>[0];

type Params = CanIUseParams | WikipediaParams;

type Result = Awaited<ReturnType<typeof caniuse>>;

function isParams<T extends Params>(
  source: string,
  params: Params,
): params is T {
  return params.source === source;
}

export default async function update(params: Params) {
  let stats: Result = { version: "0", usage: 0 };

  if (isParams<CanIUseParams>("caniuse", params)) {
    const { source, ...caniuseParams } = params;
    stats = await caniuse(caniuseParams);
  }

  if (isParams<WikipediaParams>("wikipedia", params)) {
    const { source, ...wikipediaParams } = params;
    stats = await wikipedia(wikipediaParams);
  }

  return {
    version: toSimpleVersionString(stats.version),
    usage: stats.usage,
  };
}

export async function updateFromMultiple(params: Params[]) {
  const stats = await Promise.all(params.map(update));
  const usages = stats
    .map(({ usage }) => usage)
    .filter((item) => typeof item !== "undefined") as number[];

  return {
    version: highestVersion(
      stats
        .map(({ version }) => version)
        .filter((version) => typeof version !== "undefined") as string[],
    ),
    usage: usages.length > 0 ? Math.max(...usages) : undefined,
  };
}
