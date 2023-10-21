import type { ReactNode } from "react";
import { ExternalLinkIcon } from "../Icon";
import styles from "./link.module.scss";

type Props = {
  href: string;
  children: ReactNode;
};

export function ExternalLink({ href, children }: Props) {
  return (
    <a
      className={styles.externalLink}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ExternalLinkIcon /> {children}
    </a>
  );
}
