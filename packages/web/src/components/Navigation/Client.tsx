"use client";

import { usePathname, useSearchParams } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import NProgress from "nprogress";
import { useEffect } from "react";

export function Client() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return <NextTopLoader color="#1095c1" showSpinner={false} />;
}
