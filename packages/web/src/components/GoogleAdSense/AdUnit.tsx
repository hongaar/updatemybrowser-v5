"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import type { Dict } from "../../dictionaries/en";
import styles from "./adUnit.module.scss";

type Props = {
  language: string;
  dict: Dict;
  slot: string;
  layout?: "in-article";
  format?: "auto" | "fluid";
};

declare var window: { adsbygoogle: Record<string, any>[] };

const publisherId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

const isProduction = process.env.NODE_ENV === "production";

export function AdUnit({
  language,
  dict,
  slot,
  layout,
  format = "auto",
}: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const adLoaded = useRef(false);

  useEffect(() => {
    if (adLoaded.current === false) {
      console.debug(`loading ads in slot ${slot}`);
      window["adsbygoogle"] = window["adsbygoogle"] || [];
      window["adsbygoogle"].push({});
      adLoaded.current = true;
    }
  }, [slot, pathname, searchParams]);

  if (!publisherId) {
    console.log("NEXT_PUBLIC_GOOGLE_ADSENSE_ID not set");
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.adLabel}>{dict.Advertisement}</span>
      <ins
        className={`${styles.ad} ${isProduction ? "" : styles.local} ${
          !publisherId ? styles.dummy : ""
        } adsbygoogle`}
        style={{
          display: "block",
          textAlign: layout === "in-article" ? "center" : undefined,
          height: !publisherId ? "200px" : undefined,
        }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-layout={layout}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
