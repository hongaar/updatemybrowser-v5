import { getDictionary } from "../../dictionaries";
import { getLanguages } from "../../utils/sanity";
import { List } from "./List";
import styles from "./languageSwitcher.module.scss";

type Props = {
  currentLanguage: string;
};

export async function LanguageSwitcher({ currentLanguage }: Props) {
  const dict = getDictionary(currentLanguage);
  const languages = await getLanguages();

  return (
    <div className={styles.languageSwitcher}>
      {dict.Language}:{" "}
      <span className={styles.selectWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.img}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(
            languages.find((language) => language.id === currentLanguage)!.flag
              .metadata.inlineSvg,
          )}`}
          alt="Flag"
        />
        <List currentLanguage={currentLanguage} languages={languages} />
      </span>
    </div>
  );
}
