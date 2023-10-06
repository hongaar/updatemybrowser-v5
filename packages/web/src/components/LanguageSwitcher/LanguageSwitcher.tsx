import { getLanguages } from "../../utils/sanity";

export default async function LanguageSwitcher() {
  const languages = await getLanguages();

  return (
    <div>
      <h2>Languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language.id}>
            <a href={`/${language.id}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(
                  language.flag.metadata.inlineSvg,
                )}`}
                alt="Flag"
              />
              {language.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
