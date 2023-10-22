import { getBrowsersWithFlatReleases } from "@updatemybrowser/client";
import { getDictionary } from "../../../dictionaries";
import type { LanguageParams } from "../page";
import ClientCheck from "./_client";

export default async function Check({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);
  const browsers = await getBrowsersWithFlatReleases();

  return (
    <>
      <ClientCheck language={language} dict={dict} browsers={browsers} />
    </>
  );
}
