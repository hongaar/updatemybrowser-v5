import { getLanguageIds } from "../../utils/language";
import { getBrowsers } from "../../utils/sanity";
import styles from "./page.module.css";

export type LanguageParams = {
  params: {
    language: string;
  };
};

export async function generateStaticParams() {
  return (await getLanguageIds()).map((language) => ({ language }));
}

export default async function Home({ params: { language } }: LanguageParams) {
  const browsers = await getBrowsers({ language });

  return (
    <div>
      <h2>Browsers</h2>
      <ul className={styles.browserlist}>
        {browsers.map((browser) => (
          <li key={browser._id}>
            <a href={`/${language}/${browser.slug.current}`}>
              {browser.name} - {browser.description}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
