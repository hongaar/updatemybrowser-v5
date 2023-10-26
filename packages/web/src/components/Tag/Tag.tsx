import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./tag.module.scss";

type Props = {
  href?: string;
  className?: string;
  current?: boolean;
  children: ReactNode;
};

export function Tag({ href, className, current, children }: Props) {
  return href ? (
    <Link
      aria-current={current ? ("" as "true") : undefined}
      href={href}
      tabIndex={0}
      className={`${styles.tag} ${className}`}
    >
      {children}
    </Link>
  ) : (
    <span
      aria-current={current ? ("" as "true") : undefined}
      className={`${styles.tag} ${className}`}
    >
      {children}
    </span>
  );
}
