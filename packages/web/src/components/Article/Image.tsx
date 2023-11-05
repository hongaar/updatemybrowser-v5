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
    /**
     * Hydration error due to <figure> enclosed in <p> which is not allowed in
     * HTML. Not sure how to address this. Add custom renderer for P and then
     * try to detect what's in its children?
     */
    <figure className={styles.figure}>
      <NextImage fill className={styles.image} src={src} alt={alt || ""} />
      {alt ? <figcaption className={styles.caption}>{alt}</figcaption> : null}
    </figure>
  );
}
