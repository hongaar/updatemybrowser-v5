import { getLanguageIds } from "@updatemybrowser/client";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Document } from "../../components/Document";
import { getDictionary } from "../../dictionaries";
import "../../styles/index.scss";
import type { LanguageParams } from "./route";

type Props = LanguageParams & {
  children: ReactNode;
};

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
  return <Document language={language}>{children}</Document>;
}
