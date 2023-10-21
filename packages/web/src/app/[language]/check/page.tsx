import { Container } from "../../../components/Container";
import { getDictionary } from "../../../dictionaries";

export type LanguageParams = {
  params: {
    language: string;
  };
};

export default async function Home({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);

  return (
    <Container>
      <h2>{dict.BrowserCheck}</h2>
    </Container>
  );
}
