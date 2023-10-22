import { Container } from "../../../components/Container";
import { getDictionary } from "../../../dictionaries";

export type LanguageParams = {
  params: {
    language: string;
  };
};

export default async function Blog({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);

  return (
    <Container>
      <h2>{dict.Guides}</h2>
      <p>{dict.UnderConstruction}</p>
    </Container>
  );
}
