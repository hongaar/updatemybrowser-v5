import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import Image from "next/image";
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
          <div className="container">
            <h1>
              <Image src="/logo.png" width={25} height={33} alt="Logo" /> Update
              My Browser
            </h1>
          </div>
        </header>
        <main>
          {" "}
          <div className="container">{children}</div>
        </main>
        <footer>
          <div className="container">
            <LanguageSwitcher />
          </div>
        </footer>
      </body>
    </html>
  );
}
