import {
  getBrowsersWithFlatReleases,
  type ReleaseFlatExpanded,
} from "@updatemybrowser/client";
import { getDictionary } from "../../dictionaries";
import { List } from "./List";

type Props = {
  language: string;
};

function averageUsage(releases: ReleaseFlatExpanded[]) {
  return releases.length === 0
    ? 0
    : releases.reduce((acc, release) => {
        return acc + release.currentUsage;
      }, 0) / releases.length;
}

export async function BrowserList({ language }: Props) {
  const dict = getDictionary(language);
  const browsers = (await getBrowsersWithFlatReleases()).sort((a, b) => {
    return averageUsage(b.releases || []) > averageUsage(a.releases || [])
      ? 1
      : -1;
  });

  return <List dict={dict} language={language} browsers={browsers} />;
}
