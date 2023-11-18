import Script from "next/script";

const publisherId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

export function GoogleAdSense() {
  if (!publisherId) {
    console.log("NEXT_PUBLIC_GOOGLE_ADSENSE_ID not set");
    return null;
  }

  return (
    <Script
      async
      strategy="lazyOnload"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
    />
  );
}