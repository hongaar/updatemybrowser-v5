"use client";

import Script from "next/script";
import { Container } from "../../../components/Container";
import type { LanguageParams } from "../page";

declare var UMB: any;

// export async function generateStaticParams() {
//   return (await getLanguageIds()).map((language) => ({ language }));
// }

// export function generateMetadata({ params: { language } }: LanguageParams) {
//   const dict = getDictionary(language);

//   return {
//     title: pageTitle(dict.Widget),
//   } as Metadata;
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
