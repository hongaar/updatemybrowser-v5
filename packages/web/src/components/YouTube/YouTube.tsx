import Image from "next/image";
import styles from "./youtube.module.scss";

type Props = {
  language: string;
  youtubeId: string;
  className?: string;
  showCover?: boolean;
};

function parseYoutubeId(urlOrId: string) {
  return urlOrId.replace("https://www.youtube.com/watch?v=", "");
}

export function getThumbnailUrl(
  youtubeId: string,
  index:
    | 0
    | 1
    | 2
    | 3
    | "default"
    | "sddefault"
    | "mqdefault"
    | "hqdefault"
    | "maxresdefault" = "maxresdefault",
) {
  return `https://img.youtube.com/vi/${parseYoutubeId(youtubeId)}/${index}.jpg`;
}

export function YouTube({
  language,
  youtubeId,
  className,
  showCover = false,
}: Props) {
  const searchParams = new URLSearchParams();

  searchParams.set("hl", language);
  searchParams.set("cc_lang_pref", language);
  searchParams.set("cc_load_policy", "1");
  searchParams.set("color", "white");
  searchParams.set("controls", "1");

  youtubeId = parseYoutubeId(youtubeId);

  return (
    <div className={`${styles.wrapper} ${className || ""}`}>
      <iframe
        className={styles.iframe}
        src={`https://www.youtube.com/embed/${youtubeId}?${searchParams.toString()}`}
        frameBorder="0"
      />
      {showCover ? (
        <Image
          className={styles.thumbnail}
          src={getThumbnailUrl(youtubeId)}
          alt="Thumbnail for browser video"
          width="1276"
          height="717"
        />
      ) : null}
    </div>
  );
}
