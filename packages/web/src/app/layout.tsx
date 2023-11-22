import type { Metadata } from "next";
import type { ReactNode } from "react";
import english from "../dictionaries/en";

type Props = {
  children: ReactNode;
};

const REVALIDATE_PRODUCTION = 3600 * 24; // 1 day
const REVALIDATE_DEVELOPMENT = 60; // 1 minute

export const revalidate =
  process.env.NODE_ENV === "production"
    ? REVALIDATE_PRODUCTION
    : REVALIDATE_DEVELOPMENT;

export const dynamic = "force-static";

export function generateMetadata() {
  const dict = english;

  return {
    title: `Update My Browser - ${dict.SubHeading}`,
  } as Metadata;
}

export default function Layout({ children }: Props) {
  return children;
}
