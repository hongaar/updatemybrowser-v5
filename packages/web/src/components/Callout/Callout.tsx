import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./callout.module.scss";

type Props = {
  children: ReactNode;
  href?: string;
  support?: boolean;
  warning?: boolean;
  error?: boolean;
  muted?: boolean;
};

export function Callout({
  children,
  href,
  support,
  warning,
  error,
  muted,
}: Props) {
  return href ? (
    <Link
      tabIndex={0}
      href={href}
      className={`${styles.callout} ${support ? styles.support : ""} ${
        warning ? styles.warning : ""
      } ${error ? styles.error : ""} ${muted ? styles.muted : ""}`}
    >
      {children}
    </Link>
  ) : (
    <div
      className={`${styles.callout} ${support ? styles.support : ""} ${
        warning ? styles.warning : ""
      } ${error ? styles.error : ""} ${muted ? styles.muted : ""}`}
    >
      {children}
    </div>
  );
}
