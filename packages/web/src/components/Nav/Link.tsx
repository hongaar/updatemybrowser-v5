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
      className={styles.link}
      href={href}
      aria-current={pathname === href ? ("" as "true") : undefined}
    >
      {children}
    </BaseLink>
  );
}