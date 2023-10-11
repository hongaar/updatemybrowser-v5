import { Container } from "..";
import { getDictionary } from "../../dictionaries";
import { Link } from "./Link";
import styles from "./nav.module.scss";

type Props = {
  language: string;
};

export function Nav({ language }: Props) {
  const dict = getDictionary(language);

  return (
    <nav className={styles.nav}>
      <Container className={styles.container}>
        <Link href={`/${language}`}>{dict.BrowserCheck}</Link>
        <Link href={`/${language}/browsers`}>{dict.BrowserOverview}</Link>
        <Link href={`/${language}/widget`}>{dict.Widget}</Link>
        <Link href={`/${language}/guides`}>{dict.Guides}</Link>
      </Container>
    </nav>
  );
}
