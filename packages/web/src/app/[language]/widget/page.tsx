"use client";

import Script from "next/script";
import { Container } from "../../../components/Container";

declare var UMB: any;

export type LanguageParams = {
  params: {
    language: string;
  };
};

// export async function generateStaticParams() {
//   return (await getLanguageIds()).map((language) => ({ language }));
// }

export default function Widget({ params: { language } }: LanguageParams) {
  // const dict = getDictionary(language);

  return (
    <Container>
      <Script src="https://updatemybrowser.org/umb.js" />
      {/* <h2>{dict.Widget}</h2> */}
      {/* <p>{dict.UnderConstruction}</p> */}
      <button onClick={() => UMB.displayWidget()}>Demo</button>
    </Container>
  );
}
