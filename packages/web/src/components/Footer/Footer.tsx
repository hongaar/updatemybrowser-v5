import { getBrowsersWithFlatReleases, getOses } from "@updatemybrowser/client";
import Link from "next/link";
import { getDictionary } from "../../dictionaries";
import { Container } from "../Container";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { ExternalLink } from "../Link";
import styles from "./footer.module.scss";

type Props = {
  language: string;
};

export async function Footer({ language }: Props) {
  const browsers = await getBrowsersWithFlatReleases();
  const oses = await getOses();
  const dict = getDictionary(language);
  return (
    <footer className={styles.footer}>
      <Container className={styles.header}>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} UpdateMyBrowser.org
        </div>
        <LanguageSwitcher currentLanguage={language} />
      </Container>
      <Container className={styles.links}>
        <div>
          <p className={styles.muted}>{dict.Browsers}</p>{" "}
          <ul>
            {browsers
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((browser) => (
                <li key={browser._id}>
                  <Link
                    tabIndex={0}
                    href={`/${language}/browsers/${browser.slug.current}`}
                  >
                    {browser.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <p className={styles.muted}>{dict.OperatingSystems}</p>{" "}
          <ul>
            {oses
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((os) => (
                <li key={os._id}>
                  <Link
                    tabIndex={0}
                    href={`/${language}/browsers/os/${os.slug.current}`}
                  >
                    {os.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <p className={styles.muted}>{dict.DataSources}</p>
          <ul>
            <li>
              <ExternalLink style="link" href="https://caniuse.com">
                Can I Use
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                style="link"
                href="https://alternativeto.net/category/browsers/web-browser/"
              >
                AlternativeTo
              </ExternalLink>
            </li>
            <li>
              <ExternalLink style="link" href="https://www.wikipedia.org">
                Wikipedia
              </ExternalLink>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
