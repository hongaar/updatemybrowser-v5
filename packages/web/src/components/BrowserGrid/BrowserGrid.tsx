import { type BrowserWithFlatReleases } from "@updatemybrowser/client";
import { getDictionary } from "../../dictionaries";
import { Grid } from "./Grid";

type Props = {
  language: string;
  browsers: BrowserWithFlatReleases[];
};

export function BrowserGrid({ language, browsers }: Props) {
  const dict = getDictionary(language);

  return <Grid dict={dict} language={language} browsers={browsers} />;
}
