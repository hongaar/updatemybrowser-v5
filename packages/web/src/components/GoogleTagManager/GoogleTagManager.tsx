"use client";

import Script from "next/script";
import { useEffect } from "react";

declare var window: { dataLayer: Record<string, any>[] };

const tagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

export function GoogleTagManager() {
  useEffect(() => {
    window["dataLayer"] = window["dataLayer"] || [];
    window["dataLayer"].push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });
  }, []);

  if (!tagId) {
    console.log("NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID not set");
    return null;
  }

  return (
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtm.js?id=${tagId}`}
    />
  );
}
