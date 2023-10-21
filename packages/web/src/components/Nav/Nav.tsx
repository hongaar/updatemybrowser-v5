import { getDictionary } from "../../dictionaries";
import { Container } from "../Container";
import { Link } from "./Link";
import styles from "./nav.module.scss";

type Props = {
  language: string;
};

function maybeHideBrowser(text: string) {
  return (
    <>
      {text.includes("Browser ") ? (
        <span className={styles.textBrowser}>Browser </span>
      ) : null}
      {text.replace("Browser ", "")}
    </>
  );
}

export function Nav({ language }: Props) {
  const dict = getDictionary(language);

  return (
    <nav className={styles.nav}>
      <Container noPadding>
        <Link href={`/${language}/check`}>
          {maybeHideBrowser(dict.BrowserCheck)}
        </Link>
        <Link href={`/${language}/browsers`}>
          {maybeHideBrowser(dict.BrowserOverview)}
        </Link>
        <Link href={`/${language}/widget`}>{dict.Widget}</Link>
        <Link href={`/${language}/guides`}>{dict.Guides}</Link>
      </Container>
    </nav>
  );
}
