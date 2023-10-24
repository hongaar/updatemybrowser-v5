import { ExternalLinkIcon } from "../Icon";
import styles from "./link.module.scss";

type Props = {
  style?: "icon" | "iconLink" | "link";
  href: string;
  children: string;
};

export function ExternalLink({ href, children, style = "iconLink" }: Props) {
  return style === "icon" ? (
    <a
      className={styles.externalLink}
      href={href}
      title={children}
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
        title={children}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ExternalLinkIcon />
      </a>
    </span>
  ) : (
    <a
      className={styles.externalLink}
      href={href}
      title={children}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ExternalLinkIcon /> {children}
    </a>
  );
}
