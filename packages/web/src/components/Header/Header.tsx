import Image from "next/image";
import { Container } from "..";
import { getDictionary } from "../../dictionaries";
import styles from "./header.module.scss";

type Props = {
  language: string;
};

export function Header({ language }: Props) {
  const dict = getDictionary(language);

  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <Image
          className={styles.logo}
          src="/logo.png"
          width={32}
          height={44}
          alt="Logo"
        />
        <h1 className={styles.heading}>Update My Browser</h1>
        <h2 className={styles.subHeading}>{dict.SubHeading}</h2>
      </Container>
    </header>
  );
}
