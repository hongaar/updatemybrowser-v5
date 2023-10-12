import fetch from "cross-fetch";

// See https://github.com/Fyrd/caniuse
const dataUrl =
  "https://raw.githubusercontent.com/Fyrd/caniuse/main/fulldata-json/data-2.0.json";

type CanIUseData = {
  agents: {
    [key: string]: {
      browser: string;
      long_name: string;
      abbr: string;
      prefix: string;
      type: string;
      usage_global: { [key: string]: number };
      version_list: {
        version: string;
        global_usage: number;
        release_date: number | null;
        era: number;
        prefix: string;
      }[];
      current_version: string;
    };
  };
  statuses: unknown;
  cats: unknown;
  updated: unknown;
  data: unknown;
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

  const usage = data.agents[agent]!.version_list.reduce(
    (acc, { global_usage }) => {
      return acc + global_usage;
    },
    0,
  );

  return {
    version: data.agents[agent]!.current_version,
    usage,
  };
}
