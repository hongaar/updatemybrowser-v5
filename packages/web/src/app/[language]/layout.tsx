import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { Container, Footer, Header, Nav } from "../../components";
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

export const metadata: Metadata = {
  title: "Update My Browser",
  description: "Update My Browser - Always fresh",
};

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
