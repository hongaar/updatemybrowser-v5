import Image from "next/image";
import { getDictionary } from "../../dictionaries";
import { courgette } from "../../utils/fonts";
import { Container } from "../Container";
import { LanguageSwitcher } from "../LanguageSwitcher";
import styles from "./header.module.scss";

const logoRatio = 73 / 100;

type Props = {
  language: string;
};

export function Header({ language }: Props) {
  const dict = getDictionary(language);

  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <div className={styles.leftPart}>
          <Image
            className={styles.logo}
            src="/logo.png"
            width={Math.round(logoRatio * 30)}
            height={30}
            alt="Logo"
          />
          <h1 className={styles.heading}>Update My Browser</h1>
          <h2 className={`${styles.subHeading} ${courgette.className}`}>
            {dict.SubHeading}
          </h2>
        </div>
        <LanguageSwitcher
          className={styles.languageSwitcher}
          currentLanguage={language}
        />
      </Container>
    </header>
  );
}
