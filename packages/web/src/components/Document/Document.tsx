import { defaultLanguage } from "@updatemybrowser/client";
import type { ReactNode } from "react";
import "../../styles/index.scss";
import { fira } from "../../utils/fonts";
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
