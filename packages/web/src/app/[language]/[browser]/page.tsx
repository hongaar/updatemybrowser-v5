import { getBrowsers } from "@updatemybrowser/client";
import { notFound } from "next/navigation";
import { getDictionary } from "../../../dictionaries";
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
  const dict = getDictionary(language);
  const browsers = await getBrowsers();
  const browserObj = browsers.find((item) => item.slug.current === browser);

  if (!browserObj) {
    throw notFound();
  }

  return (
    <div>
      <h2>{browserObj.name}</h2>
    </div>
  );
}
