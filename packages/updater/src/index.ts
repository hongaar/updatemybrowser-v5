import { caniuse, wikipedia } from "./sources/index.js";
import { highestVersion, toSimpleVersionString } from "./version.js";

type CanIUseParams = {
  source: "caniuse";
} & Parameters<typeof caniuse>[0];

type WikipediaParams = {
  source: "wikipedia";
} & Parameters<typeof wikipedia>[0];

type Params = CanIUseParams | WikipediaParams;

function isParams<T extends Params>(
  source: string,
  params: Params,
): params is T {
  return params.source === source;
}

export default async function update(params: Params) {
  let version = "0";

  if (isParams<CanIUseParams>("caniuse", params)) {
    const { source, ...caniuseParams } = params;
    version = await caniuse(caniuseParams);
  }

  if (isParams<WikipediaParams>("wikipedia", params)) {
    const { source, ...wikipediaParams } = params;
    version = await wikipedia(wikipediaParams);
  }

  return toSimpleVersionString(version);
}

export async function updateFromMultiple(params: Params[]) {
  const results = await Promise.all(params.map(update));

  return highestVersion(results);
}
