import { getLanguageIds } from "@updatemybrowser/client";
import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { Container, Footer, Header, Nav } from "../../components";
import { getDictionary } from "../../dictionaries";
import "../../styles/index.scss";
import type { LanguageParams } from "./page";

type Props = LanguageParams & {
  children: ReactNode;
};

const fira = Fira_Sans({ subsets: ["latin"], weight: ["400", "600"] });

const REVALIDATE_PRODUCTION = 3600 * 24; // 1 day
const REVALIDATE_DEVELOPMENT = 60; // 1 minute

export const revalidate =
  process.env.NODE_ENV === "production"
    ? REVALIDATE_PRODUCTION
    : REVALIDATE_DEVELOPMENT;

export function generateMetadata({ params: { language } }: Props) {
  const dict = getDictionary(language);

  return {
    title: `Update My Browser - ${dict.SubHeading}`,
  } as Metadata;
}

export async function generateStaticParams() {
  return (await getLanguageIds()).map((language) => ({ language }));
}

export default function Layout({ children, params: { language } }: Props) {
  return (
    <html lang={language}>
      <body className={fira.className}>
        <Header language={language} />
        <Nav language={language} />
        <main>
          <Container>{children}</Container>
        </main>
        <Footer language={language} />
      </body>
    </html>
  );
}
