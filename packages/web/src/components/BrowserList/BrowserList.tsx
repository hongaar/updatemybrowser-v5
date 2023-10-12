import { getDictionary } from "../../dictionaries";
import { getReleases } from "../../utils/sanity";
import { List } from "./List";

type Props = {
  language: string;
};

export async function BrowserList({ language }: Props) {
  const dict = getDictionary(language);
  const releases = await getReleases({ language });

  return <List dict={dict} language={language} releases={releases} />;
}
