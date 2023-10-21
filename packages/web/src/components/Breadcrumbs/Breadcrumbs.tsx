import Link from "next/link";
import { getDictionary } from "../../dictionaries";
import { Container } from "../Container";
import styles from "./breadcrumbs.module.scss";

type Props = {
  language: string;
  segments: {
    label: string;
    path?: string;
  }[];
};

export function Breadcrumbs({ language, segments }: Props) {
  const dict = getDictionary(language);

  return (
    <nav aria-label="breadcrumb" className={styles.nav}>
      <Container className={styles.container}>
        <ul className={styles.breadcrumbs}>
          <li className={styles.crumb}>
            <Link tabIndex={0} href={`/${language}`}>
              {dict.Home}
            </Link>
          </li>
          {segments.map((segment, index) => (
            <li key={index} className={styles.crumb}>
              {segment.path ? (
                <Link tabIndex={0} href={`/${language}${segment.path}`}>
                  {segment.label}
                </Link>
              ) : (
                segment.label
              )}
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
