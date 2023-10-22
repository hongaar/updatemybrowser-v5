import { type BrowserWithFlatReleases } from "@updatemybrowser/client";
import { getDictionary } from "../../dictionaries";
import { List } from "./Grid";

type Props = {
  language: string;
  browsers: BrowserWithFlatReleases[];
};

export function BrowserGrid({ language, browsers }: Props) {
  const dict = getDictionary(language);

  return <List dict={dict} language={language} browsers={browsers} />;
}
