import {
  getExpandedBrowsers,
  getLanguages,
  getOses,
} from "@updatemybrowser/client";
import Link from "next/link";
import { getDictionary } from "../../dictionaries";
import { Container } from "../Container";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { ExternalLink } from "../Link";
import { ConsentPreferences } from "./ConsentPreferences";
import { Improvement } from "./Improvement";
import styles from "./footer.module.scss";

type Props = {
  language: string;
};

export async function Footer({ language }: Props) {
  const browsers = await getExpandedBrowsers();
  const oses = await getOses();
  const languages = await getLanguages();

  const dict = getDictionary(language);

  return (
    <>
      <Improvement language={language} dict={dict} />
      <footer className={styles.footer}>
        <Container className={styles.header}>
          <div className={styles.copyright}>
            <span>&copy; {new Date().getFullYear()} UpdateMyBrowser.org</span>
            <br className={styles.copyrightBreak} />
            <Link href={`/${language}/terms-and-conditions`} tabIndex={0}>
              Terms & Conditions
            </Link>{" "}
            <Link href={`/${language}/privacy-policy`} tabIndex={0}>
              Privacy Policy
            </Link>{" "}
            <Link href={`/${language}/cookie-policy`} tabIndex={0}>
              Cookie Policy
            </Link>{" "}
            <ConsentPreferences />
          </div>
          <LanguageSwitcher currentLanguage={language} />
        </Container>
        <Container className={styles.links}>
          <div>
            <p className={styles.muted}>{dict.Browsers}</p>
            <ul>
              {browsers
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((browser) => (
                  <li key={browser._id}>
                    <Link
                      prefetch={false}
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
            <p className={styles.muted}>{dict.BrowserOverviews}</p>
            <ul>
              <li>
                <Link
                  prefetch={false}
                  tabIndex={0}
                  href={`/${language}/browsers`}
                >
                  {dict.BrowserOverview}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  tabIndex={0}
                  href={`/${language}/browsers/comparison`}
                >
                  {dict.BrowserFeaturesComparison}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  tabIndex={0}
                  href={`/${language}/browsers/most-popular`}
                >
                  {dict.MostPopularBrowsers}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  tabIndex={0}
                  href={`/${language}/browsers/most-used`}
                >
                  {dict.MostUsedBrowsers}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className={styles.muted}>{dict.OperatingSystems}</p>
            <ul>
              {oses
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((os) => (
                  <li key={os._id}>
                    <Link
                      prefetch={false}
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
            <p className={styles.muted}>{dict.Languages}</p>
            <ul>
              {languages
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((language) => (
                  <li key={language._id}>
                    <Link
                      prefetch={false}
                      tabIndex={0}
                      href={`/${language.id}`}
                    >
                      {language.name}
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
    </>
  );
}
