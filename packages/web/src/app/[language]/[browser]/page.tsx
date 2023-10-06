import { getBrowsers, getLanguages } from "../../../utils/sanity";
import type { LanguageParams } from "../page";

type BrowserParams = {
  params: {
    browser: string;
  };
};

export async function generateStaticParams() {
  return (await getBrowsers()).map((browser) => ({ browser: browser.name }));
}

export default async function Browser({
  params: { browser, language },
}: LanguageParams & BrowserParams) {
  const languages = await getLanguages();
  const browsers = await getBrowsers();

  return (
    <div>
      <h2>Current browser: {browser}</h2>
    </div>
  );
}
