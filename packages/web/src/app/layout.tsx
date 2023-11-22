import type { Metadata } from "next";
import type { ReactNode } from "react";
import english from "../dictionaries/en";

type Props = {
  children: ReactNode;
};

export function generateMetadata() {
  const dict = english;

  return {
    title: `Update My Browser - ${dict.SubHeading}`,
  } as Metadata;
}

export default function Layout({ children }: Props) {
  return children;
}
