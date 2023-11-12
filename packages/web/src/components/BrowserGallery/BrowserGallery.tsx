"use client";

import { type FlatBrowser } from "@updatemybrowser/client";
import PhotoAlbum from "react-photo-album";
import type { Dict } from "../../dictionaries/en";
import { useLightbox } from "../Lightbox";
import { getThumbnailUrl } from "../YouTube";
import { NextImage } from "./NextImage";
import styles from "./browserGallery.module.scss";

type Props = {
  language: string;
  dict: Dict;
  browser: FlatBrowser;
};

export type BrowserGalleryItem = {
  type?: "image" | "youtube" | any;
  src: string;
  youtubeId?: string;
  width: number;
  height: number;
};

export function BrowserGallery({ language, dict, browser }: Props) {
  const { openLightboxAt, renderLightbox } = useLightbox({ language });

  if (
    (!browser.screenshots || browser.screenshots?.length === 0) &&
    !browser.youtubeId
  ) {
    return null;
  }

  const slides = (
    browser.youtubeId
      ? [
          {
            type: "youtube",
            src: getThumbnailUrl(browser.youtubeId),
            youtubeId: browser.youtubeId,
            width: 1276,
            height: 717,
          } as BrowserGalleryItem,
        ]
      : []
  ).concat(
    (browser.screenshots || []).map(
      (screenshot) =>
        ({
          type: "image",
          src: screenshot.asset.url,
          width: screenshot.asset.metadata.dimensions.width,
          height: screenshot.asset.metadata.dimensions.height,
        }) as BrowserGalleryItem,
    ),
  );

  return (
    <>
      <PhotoAlbum
        defaultContainerWidth={756}
        renderPhoto={NextImage}
        layout="rows"
        targetRowHeight={150}
        photos={slides}
        onClick={({ index }) => openLightboxAt(index)}
        componentsProps={{
          containerProps: {
            className: styles.gallery,
          },
          imageProps: {
            className: styles.image,
          },
        }}
      />

      {renderLightbox({
        slides,
        controller: {
          closeOnBackdropClick: true,
        },
      })}
    </>
  );
}
