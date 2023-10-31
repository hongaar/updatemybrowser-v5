import type { ReactNode } from "react";
import { ExternalLinkIcon } from "../Icon";
import styles from "./link.module.scss";

type Props = {
  style?: "icon" | "iconLink" | "link";
  href: string;
  children: ReactNode;
};

export function ExternalLink({ href, children, style = "iconLink" }: Props) {
  return style === "icon" ? (
    <a
      className={styles.externalLink}
      href={href}
      title={typeof children === "string" ? children : undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ExternalLinkIcon />
    </a>
  ) : style === "iconLink" ? (
    <span className={styles.externalLink}>
      {children}{" "}
      <a
        className={styles.externalLink}
        href={href}
        title={typeof children === "string" ? children : undefined}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ExternalLinkIcon />
      </a>
    </span>
  ) : (
    // link
    <a
      className={styles.externalLink}
      href={href}
      title={typeof children === "string" ? children : undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ExternalLinkIcon /> {children}
    </a>
  );
}
