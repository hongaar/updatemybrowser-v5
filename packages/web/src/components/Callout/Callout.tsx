import type { ReactNode } from "react";
import styles from "./callout.module.scss";

type Props = {
  children: ReactNode;
  support?: boolean;
  warning?: boolean;
  error?: boolean;
  muted?: boolean;
};

export function Callout({ children, support, warning, error, muted }: Props) {
  return (
    <div
      className={`${styles.callout} ${support ? styles.support : ""} ${
        warning ? styles.warning : ""
      } ${error ? styles.error : ""} ${muted ? styles.muted : ""}`}
    >
      {children}
    </div>
  );
}
