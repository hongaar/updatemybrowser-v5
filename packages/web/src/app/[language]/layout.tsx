import { getLanguageIds } from "@updatemybrowser/client";
import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "../../components/Footer";
import { GoogleAdSense } from "../../components/GoogleAdSense";
import { GoogleTagManager } from "../../components/GoogleTagManager";
import { Header } from "../../components/Header";
import { Nav } from "../../components/Nav";
import { NavigationProgress } from "../../components/Navigation";
import { getDictionary } from "../../dictionaries";
import "../../styles/index.scss";
import type { LanguageParams } from "./route";

type Props = LanguageParams & {
  children: ReactNode;
};

const fira = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-text",
});

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
      <GoogleTagManager />
      <GoogleAdSense />
      <body className={`${fira.className} ${fira.variable}`}>
        <NavigationProgress />
        <Header language={language} />
        <Nav language={language} />
        <main>{children}</main>
        <Footer language={language} />
      </body>
    </html>
  );
}
