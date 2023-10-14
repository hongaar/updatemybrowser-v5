import { getLanguageIds } from "@updatemybrowser/client";
import { getDictionary } from "../../dictionaries";

export type LanguageParams = {
  params: {
    language: string;
  };
};

export async function generateStaticParams() {
  return (await getLanguageIds()).map((language) => ({ language }));
}

export default async function Home({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);

  return (
    <div>
      <h2>{dict.BrowserCheck}</h2>
    </div>
  );
}
