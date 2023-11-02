import type { Metadata } from "next";
import Script from "next/script";
import { Container } from "../../../components/Container";
import { getDictionary } from "../../../dictionaries";
import { pageTitle } from "../../../utils";
import type { LanguageParams } from "../route";
import ClientWidget from "./_client";

export function generateMetadata({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);

  return {
    title: pageTitle(dict.Widget),
  } as Metadata;
}

export default function Widget({ params: { language } }: LanguageParams) {
  const dict = getDictionary(language);

  return (
    <Container>
      <Script src="https://updatemybrowser.org/umb.js" />
      <h2>{dict.Widget}</h2>
      <ClientWidget language={language} dict={dict} />{" "}
    </Container>
  );
}
