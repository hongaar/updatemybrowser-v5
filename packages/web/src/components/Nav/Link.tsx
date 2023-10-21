"use client";

import BaseLink from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./nav.module.scss";

type Props = {
  href: string;
  children: ReactNode;
};

export function Link({ href, children }: Props) {
  const pathname = usePathname();

  return (
    <BaseLink
      tabIndex={0}
      className={styles.link}
      href={href}
      aria-current={pathname.startsWith(href) ? ("" as "true") : undefined}
    >
      {children}
    </BaseLink>
  );
}
