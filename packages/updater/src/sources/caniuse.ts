import fetch from "cross-fetch";

// See https://github.com/Fyrd/caniuse
const dataUrl = "https://raw.githubusercontent.com/Fyrd/caniuse/main/data.json";

type CanIUseData = {
  eras: any;
  agents: {
    [key: string]: {
      browser: string;
      abbr: string;
      prefix: string;
      type: "desktop" | "mobile";
      usage_global: number[];
      versions: Array<string | null>;
    };
  };
  statuses: any;
  cats: any;
  data: any;
  updated: number;
};

async function fetchData(): Promise<CanIUseData> {
  return fetch(dataUrl).then((res) => res.json());
}

export async function caniuse({ agent }: { agent: string }) {
  const data = await fetchData();

  if (!data.agents[agent]) {
    throw new Error(
      `Agent ${agent} not found in CanIUse data, keys found: ${Object.keys(
        data.agents,
      ).join(", ")}`,
    );
  }

  const versions = data.agents[agent]!.versions;

  return versions.filter((item) => item !== null).reverse()[0] as string;
}
