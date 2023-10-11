import type { ReactNode } from "react";
import styles from "./container.module.scss";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: Props) {
  return (
    <div className={[styles.container, className].join(" ")}>{children}</div>
  );
}
