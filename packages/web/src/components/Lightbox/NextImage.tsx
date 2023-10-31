import Image, { type StaticImageData } from "next/image";
import { type RenderSlideProps } from "yet-another-react-lightbox";
import { YouTube } from "../YouTube";
import styles from "./lightbox.module.scss";
import type { LightboxItem } from "./useLightbox";

type Props = {
  language: string;
};

function getDimensions(
  box: { width: number; height: number },
  object: { width: number; height: number },
) {
  if (object.width > box.width && object.height < box.height) {
    return {
      width: box.width,
      height: (box.width / object.width) * object.height,
    };
  }

  if (object.height > box.height && object.width < box.width) {
    return {
      width: (box.height / object.height) * object.width,
      height: box.height,
    };
  }

  if (object.width > box.width && object.height > box.height) {
    const width = box.width;
    const height = (box.width / object.width) * object.height;

    if (height > box.height) {
      return {
        width: (box.height / object.height) * object.width,
        height: box.height,
      };
    }

    return { width, height };
  }

  return { width: object.width, height: object.height };
}

export function NextImageFactory({ language }: Props) {
  return function NextImage({ slide, rect }: RenderSlideProps<LightboxItem>) {
    const { width, height } = getDimensions(rect, slide);

    return (
      <div style={{ position: "relative", width, height }}>
        {slide.type === "youtube" ? (
          <YouTube
            className={styles.youtube}
            language={language}
            youtubeId={slide.youtubeId!}
          />
        ) : (
          <Image
            fill
            alt=""
            src={slide as StaticImageData}
            loading="eager"
            draggable={false}
            className={styles.image}
            style={{ objectFit: "contain" }}
            sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
          />
        )}
      </div>
    );
  };
}
