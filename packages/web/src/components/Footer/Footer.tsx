import { Container } from "../Container";
import { LanguageSwitcher } from "../LanguageSwitcher";
import styles from "./footer.module.scss";

type Props = {
  language: string;
};

export function Footer({ language }: Props) {
  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} UpdateMyBrowser.org
        </div>
        <LanguageSwitcher currentLanguage={language} />
      </Container>
    </footer>
  );
}
