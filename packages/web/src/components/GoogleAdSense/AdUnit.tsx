"use client";

import { unsafeRandomId } from "@updatemybrowser/core";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { Fragment, useCallback, useEffect, useState } from "react";
import type { Dict } from "../../dictionaries/en";
import styles from "./adUnit.module.scss";

type Props = {
  language: string;
  dict: Dict;
  slot: string;
  layout?: "in-article";
  format?: "auto" | "fluid";
  fullWidth?: boolean;
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
  fullWidth = true,
}: Props) {
  const [randomId, updateRandomId] = useState(unsafeRandomId());
  const forceUpdate = useCallback(() => updateRandomId(unsafeRandomId()), []);
  const pathname = usePathname();

  // Refresh ads every minute
  useEffect(() => {
    const refreshAdInterval = setInterval(forceUpdate, 1000 * 5);

    return () => {
      clearInterval(refreshAdInterval);
    };
  }, [forceUpdate]);

  // Refresh ads when the pathname changes
  useEffect(() => {
    forceUpdate();
  }, [forceUpdate, pathname]);

  if (!publisherId) {
    console.log("NEXT_PUBLIC_GOOGLE_ADSENSE_ID not set");
  }

  return (
    <Fragment key={randomId}>
      <ins
        className={`${styles.ad} ${isProduction ? "" : styles.local} ${
          !publisherId ? styles.dummy : ""
        } adsbygoogle`}
        style={{
          display: "block",
          textAlign: layout === "in-article" ? "center" : undefined,
          height: !publisherId ? "200px" : undefined,
        }}
        data-render-id={randomId}
        // data-label={dict.Advertisement}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-layout={layout}
        data-ad-format={format}
        data-full-width-responsive={fullWidth}
      />
      <Script id={`adunit-${slot}-${String(Math.random())}`}>{`
console.debug("loading ads in slot ${slot}");
try {
  window["adsbygoogle"] = window["adsbygoogle"] || [];
  window["adsbygoogle"].push({});
} catch (error) {
  console.error(error);
}
`}</Script>
    </Fragment>
  );
}
