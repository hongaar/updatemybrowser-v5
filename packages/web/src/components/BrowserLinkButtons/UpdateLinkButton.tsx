import type {
  FlatBrowser,
  FlatExpandedRelease,
  OS,
  Release,
} from "@updatemybrowser/client";
import type { Dict } from "../../dictionaries/en";
import { BrowserLinkButton } from "./BrowserLinkButton";

type Props = {
  language: string;
  dict: Dict;
  browser?: FlatBrowser;
  release?: Release | FlatExpandedRelease;
  os?: OS;
};

export function makeUpdateLinkButton({
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

  return function UpdateLinkButton() {
    return (
      <BrowserLinkButton href={release?.updateUrl || release?.downloadUrl}>
        {dict.Update} {browser.name} {os ? dict.For : null} {os?.name}
      </BrowserLinkButton>
    );
  };
}
