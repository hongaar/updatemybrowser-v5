"use client";

import Image from "next/image";
import type { RenderPhotoProps } from "react-photo-album";
import type { BrowserGalleryItem } from "./BrowserGallery";
import styles from "./browserGallery.module.scss";

export function NextImage({
  photo,
  imageProps: {
    alt,
    title,
    sizes,
    className,
    onClick,
    decoding,
    loading,
    style,
    ...rest
  },
  wrapperStyle,
}: RenderPhotoProps<BrowserGalleryItem>) {
  return (
    <div
      className={
        photo.type === "youtube" ? styles.youtubeWrapper : styles.wrapper
      }
      style={{ ...wrapperStyle, position: "relative" }}
    >
      <Image
        src={photo}
        {...{ alt, title, sizes, className, onClick, decoding, loading }}
      />
      {photo.type === "youtube" ? (
        <svg className={styles.play} version="1.1" viewBox="0 0 100 100">
          <path d="M50,2.5C23.8,2.5,2.5,23.8,2.5,50S23.8,97.5,50,97.5c26.2,0,47.5-21.3,47.5-47.5S76.2,2.5,50,2.5z M65.3,52.4L42.9,67.3    c-1.9,1.3-4.5-0.1-4.5-2.4V35.1c0-2.3,2.6-3.7,4.5-2.4l22.4,14.9C67,48.7,67,51.3,65.3,52.4z" />
        </svg>
      ) : null}
    </div>
  );
}
