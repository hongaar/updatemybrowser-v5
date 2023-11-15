import type { ReactNode } from "react";
import { ExternalLinkIcon } from "../Icon";
import styles from "./link.module.scss";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  style?: "icon" | "iconLink" | "link";
  small?: boolean;
};

export function ExternalLink({
  href,
  children,
  className,
  style = "iconLink",
  small = false,
}: Props) {
  className = `${styles.externalLink} ${className ?? ""} ${
    small ? styles.small : ""
  }`;
  return style === "icon" ? (
    <a
      className={className}
      href={href}
      title={typeof children === "string" ? children : undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ExternalLinkIcon />
    </a>
  ) : style === "iconLink" ? (
    <span className={className}>
      {children}{" "}
      <a
        className={className}
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
      className={className}
      href={href}
      title={typeof children === "string" ? children : undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ExternalLinkIcon /> {children}
    </a>
  );
}
