import type { ReactNode } from "react";
import styles from "./tag.module.scss";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Tag({ children, className }: Props) {
  return <span className={`${styles.tag} ${className}`}>{children}</span>;
}
