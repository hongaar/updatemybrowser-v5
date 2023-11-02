import NextImage from "next/image";
import type { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import styles from "./article.module.scss";

export function Image({
  src,
  alt,
}: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  if (!src) {
    return null;
  }

  return (
    <figure className={styles.figure}>
      <NextImage fill className={styles.image} src={src} alt={alt || ""} />
      {alt ? <figcaption className={styles.caption}>{alt}</figcaption> : null}
    </figure>
  );
}
