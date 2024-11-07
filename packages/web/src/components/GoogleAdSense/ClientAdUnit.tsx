import { unsafeRandomId } from "@updatemybrowser/core";
import Script from "next/script";
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
  if (!publisherId) {
    console.log("NEXT_PUBLIC_GOOGLE_ADSENSE_ID not set");
  }

  return (
    <>
      <ins
        className={`${styles.ad} ${isProduction ? "" : styles.local} ${
          !publisherId ? styles.dummy : ""
        } adsbygoogle`}
        style={{
          display: "block",
          textAlign: layout === "in-article" ? "center" : undefined,
          height: !publisherId ? "200px" : undefined,
        }}
        data-render-id={unsafeRandomId()}
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
    </>
  );
}
