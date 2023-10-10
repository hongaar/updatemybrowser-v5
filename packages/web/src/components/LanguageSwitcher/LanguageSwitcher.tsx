import { getDictionary } from "../../dictionaries";
import { getLanguages } from "../../utils/sanity";
import List from "./List";

export default async function LanguageSwitcher({
  currentLanguage,
}: {
  currentLanguage: string;
}) {
  const dict = getDictionary(currentLanguage);
  const languages = await getLanguages();

  return (
    <div className="languageSwitcher">
      {dict.Language}:{" "}
      <span className="selectWrapper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(
            languages.find((language) => language.id === currentLanguage)!.flag
              .metadata.inlineSvg,
          )}`}
          alt="Flag"
        />
        <List
          loadingText={dict.Loading}
          currentLanguage={currentLanguage}
          languages={languages}
        />
      </span>
    </div>
  );
}
