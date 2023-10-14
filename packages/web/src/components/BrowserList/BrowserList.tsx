import { getExpandedReleases } from "@updatemybrowser/client";
import { getDictionary } from "../../dictionaries";
import { List } from "./List";

type Props = {
  language: string;
};

export async function BrowserList({ language }: Props) {
  const dict = getDictionary(language);
  const releases = await getExpandedReleases();

  return <List dict={dict} language={language} releases={releases} />;
}
