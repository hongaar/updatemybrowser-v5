import Link from "next/link";
import { getDictionary } from "../../dictionaries";
import { getBrowsers } from "../../utils/sanity";
import styles from "./browserList.module.scss";

type Props = {
  language: string;
};

export async function BrowserList({ language }: Props) {
  const dict = getDictionary(language);
  const browsers = await getBrowsers({ language });

  return (
    <ul className={styles.browserlist}>
      {browsers.map((browser) => (
        <li className={styles.listItem} key={browser._id}>
          <Link
            aria-current={
              browser.name === "Chrome" ? ("" as "true") : undefined
            }
            className={styles.link}
            href={`/${language}/${browser.slug.current}`}
          >
            <h3 className={styles.heading}>{browser.name}</h3>
            <span className={styles.version}>Version 117</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.img}
              height={80}
              width={80}
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                browser.icon?.metadata?.inlineSvg,
              )}`}
              alt="Flag"
            />
            <p className={styles.description}>{browser.description}</p>
          </Link>
        </li>
      ))}
      <li className={styles.clearFloat} />
    </ul>
  );
}
