import { getDictionary } from "../../../dictionaries";

export type LanguageParams = {
  params: {
    language: string;
  };
};

export default async function Blog({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);

  return (
    <div>
      <h2>{dict.Guides}</h2>
    </div>
  );
}
