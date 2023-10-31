import { getLanguage, getLanguages } from "@updatemybrowser/client";
import { getDictionary } from "../../dictionaries";
import { Icon } from "../Icon";
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
    <div className={`${styles.languageSwitcher} ${className || ""}`}>
      {dict.Language}:{" "}
      <span className={styles.selectWrapper}>
        {language?.flag.metadata.inlineSvg ? (
          <Icon
            size={20}
            icon={{ _type: "icon", predefined: language.flag }}
            alt="Flag"
            className={styles.img}
          />
        ) : null}
        <List currentLanguage={currentLanguage} languages={languages} />
      </span>
    </div>
  );
}
