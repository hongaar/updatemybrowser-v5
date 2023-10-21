import {
  compareAverageUsage,
  getBrowsersWithFlatReleases,
} from "@updatemybrowser/client";
import { getDictionary } from "../../dictionaries";
import { List } from "./Grid";

type Props = {
  language: string;
};

export async function BrowserGrid({ language }: Props) {
  const dict = getDictionary(language);
  const browsers = (await getBrowsersWithFlatReleases()).sort(
    compareAverageUsage,
  );

  return <List dict={dict} language={language} browsers={browsers} />;
}
