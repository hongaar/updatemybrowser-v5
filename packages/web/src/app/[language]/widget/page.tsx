import { getDictionary } from "../../../dictionaries";

export type LanguageParams = {
  params: {
    language: string;
  };
};

export default async function Widget({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);

  return (
    <div>
      <h2>{dict.Widget}</h2>
    </div>
  );
}
