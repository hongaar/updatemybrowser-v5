"use client";

import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import NProgress from "nprogress";
import { useEffect } from "react";

export function Client() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.done();
  }, [pathname]);

  return <NextTopLoader color="#1095c1" showSpinner={false} />;
}
