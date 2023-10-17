import { getLanguage, getLanguages } from "@updatemybrowser/client";
import { getDictionary } from "../../dictionaries";
import { List } from "./List";
import styles from "./languageSwitcher.module.scss";

type Props = {
  currentLanguage: string;
  className?: string;
};

export async function LanguageSwitcher({ currentLanguage, className }: Props) {
  const dict = getDictionary(currentLanguage);
  const languages = await getLanguages();
  const language = await getLanguage(currentLanguage);

  return (
    <div className={`${styles.languageSwitcher} ${className}`}>
      {dict.Language}:{" "}
      <span className={styles.selectWrapper}>
        {language?.flag.metadata.inlineSvg ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.img}
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                language.flag.metadata.inlineSvg,
              )}`}
              alt="Flag"
            />
          </>
        ) : null}
        <List currentLanguage={currentLanguage} languages={languages} />
      </span>
    </div>
  );
}
