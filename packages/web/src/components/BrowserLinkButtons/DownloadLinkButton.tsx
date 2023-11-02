import type {
  BrowserWithFlatReleases,
  OS,
  Release,
  ReleaseFlatExpanded,
} from "@updatemybrowser/client";
import type { Dict } from "../../dictionaries/en";
import { BrowserLinkButton } from "./BrowserLinkButton";

type Props = {
  language: string;
  dict: Dict;
  browser?: BrowserWithFlatReleases;
  release?: Release | ReleaseFlatExpanded;
  os?: OS;
};

export function makeDownloadLinkButton({
  language,
  dict,
  browser,
  release,
  os,
}: Props) {
  if (!browser) {
    return () => null;
  }

  if (!release) {
    release = browser.releases[0];
  }

  return function DownloadLinkButton() {
    return (
      <BrowserLinkButton href={release?.downloadUrl}>
        {dict.Download} {browser.name} {os ? dict.For : null} {os?.name}
      </BrowserLinkButton>
    );
  };
}
