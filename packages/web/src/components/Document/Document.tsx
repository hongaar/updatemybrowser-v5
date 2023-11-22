import { defaultLanguage } from "@updatemybrowser/client";
import { Fira_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "../../styles/index.scss";
import { Footer } from "../Footer";
import { GoogleAdSense } from "../GoogleAdSense";
import { GoogleTagManager } from "../GoogleTagManager";
import { Header } from "../Header";
import { Nav } from "../Nav";
import { NavigationProgress } from "../Navigation";

type Props = {
  language?: string;
  children: ReactNode;
};

const fira = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-text",
});

export function Document({ language = defaultLanguage, children }: Props) {
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
