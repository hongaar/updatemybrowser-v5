import { type BrowserWithFlatReleases } from "@updatemybrowser/client";
import type { ReactNode } from "react";
import { getDictionary } from "../../dictionaries";
import { Grid } from "./Grid";

type Props = {
  language: string;
  browsers: BrowserWithFlatReleases[];
  heading?: ReactNode;
  toggleUnavailableBrowsers?: boolean;
};

export function BrowserGrid({
  language,
  browsers,
  heading,
  toggleUnavailableBrowsers,
}: Props) {
  const dict = getDictionary(language);

  return (
    <Grid
      dict={dict}
      language={language}
      browsers={browsers}
      heading={heading}
      toggleUnavailableBrowsers={toggleUnavailableBrowsers}
    />
  );
}
