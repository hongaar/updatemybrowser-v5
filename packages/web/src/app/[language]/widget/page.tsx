import { getLanguageIds } from "@updatemybrowser/client";
import { Container } from "../../../components/Container";
import { getDictionary } from "../../../dictionaries";

export type LanguageParams = {
  params: {
    language: string;
  };
};

export async function generateStaticParams() {
  return (await getLanguageIds()).map((language) => ({ language }));
}

export default async function Widget({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);

  return (
    <Container>
      <h2>{dict.Widget}</h2>
      <p>{dict.UnderConstruction}</p>
    </Container>
  );
}
