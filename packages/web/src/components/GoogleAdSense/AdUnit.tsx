"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import styles from "./adUnit.module.scss";

type Props = {
  slot: string;
};

declare var window: { adsbygoogle: Record<string, any>[] };

const publisherId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

const isProduction = process.env.NODE_ENV === "production";

export function AdUnit({ slot }: Props) {
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
    return null;
  }

  return (
    <ins
      className={`${styles.ad} ${isProduction ? "" : styles.test} adsbygoogle`}
      style={{ display: "block" }}
      data-ad-client={publisherId}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
