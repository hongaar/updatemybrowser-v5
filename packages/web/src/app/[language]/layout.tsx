import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";
import "../../styles/index.scss";
import type { LanguageParams } from "./page";

const workSans = Work_Sans({ subsets: ["latin"], weight: ["400", "600"] });

const REVALIDATE_PRODUCTION = 3600 * 24; // 1 day
const REVALIDATE_DEVELOPMENT = 60; // 1 minute

export const revalidate =
  process.env.NODE_ENV === "production"
    ? REVALIDATE_PRODUCTION
    : REVALIDATE_DEVELOPMENT;

export const metadata: Metadata = {
  title: "Update My Browser",
  description: "Update My Browser - Always stay up to date with your browser",
};

export default function Layout({
  children,
  params: { language },
}: LanguageParams & {
  children: React.ReactNode;
}) {
  return (
    <html lang={language}>
      <body className={workSans.className}>
        <header>
          <h1>Update My Browser</h1>
        </header>
        <main>{children}</main>
        <footer>
          <LanguageSwitcher />
        </footer>
      </body>
    </html>
  );
}
