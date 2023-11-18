import type { ReactNode } from "react";
import styles from "./container.module.scss";

type Props = {
  children: ReactNode;
  noPadding?: boolean;
  fullWidth?: boolean;
  className?: string;
};

export function Container({
  children,
  noPadding,
  fullWidth,
  className,
}: Props) {
  return (
    <div
      className={[styles.container, className].join(" ")}
      style={{
        padding: noPadding ? 0 : undefined,
        width: fullWidth ? "100%" : undefined,
      }}
    >
      {children}
    </div>
  );
}
