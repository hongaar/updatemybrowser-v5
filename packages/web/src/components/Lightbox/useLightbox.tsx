import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import type { LightboxExternalProps } from "yet-another-react-lightbox";
import type { BrowserGalleryItem } from "../BrowserGallery";
import { NextImageFactory } from "./NextImage";

type Props = { language: string };

export type LightboxItem = BrowserGalleryItem;

const Lightbox = dynamic(() => import("./Lightbox"));

export function useLightbox({ language }: Props) {
  const [index, setIndex] = useState(-1);
  const [interactive, setInteractive] = useState(false);

  const openLightboxAt = useCallback((index: number) => {
    setIndex(index);
    setInteractive(true);
  }, []);

  const renderLightbox = useCallback(
    (
      props?: Omit<LightboxExternalProps, "slides" | "open" | "close"> & {
        slides: LightboxItem[];
      },
    ) =>
      interactive ? (
        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          render={{ slide: NextImageFactory({ language }) as any }}
          {...props}
        />
      ) : null,
    [interactive, index, language],
  );

  return { openLightboxAt, renderLightbox };
}
