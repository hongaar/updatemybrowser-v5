import type { Metadata } from "next";
import { Container } from "../../../components/Container";
import { getDictionary } from "../../../dictionaries";
import { pageTitle } from "../../../utils";
import type { LanguageParams } from "../page";

export function generateMetadata({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);

  return {
    title: pageTitle(dict.Guides),
  } as Metadata;
}

export default async function Guides({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);

  return (
    <Container>
      <h2>{dict.Guides}</h2>
      <p>{dict.UnderConstruction}</p>
    </Container>
  );
}
