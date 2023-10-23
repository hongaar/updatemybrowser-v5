import type { ReactNode } from "react";
import styles from "./delay.module.scss";

type Props = {
  children: ReactNode;
  seconds?: number;
};

export function Delay({ children, seconds = 1 }: Props) {
  return (
    <span
      className={styles.delay}
      style={{
        animationDuration: `${seconds}s`,
      }}
    >
      {children}
    </span>
  );
}
