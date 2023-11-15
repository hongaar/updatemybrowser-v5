"use client";

import { usePathname } from "next/navigation";
import type { Dict } from "../../dictionaries/en";
import { Container } from "../Container";
import { ExternalLink } from "../Link";
import styles from "./footer.module.scss";

type Props = {
  language: string;
  dict: Dict;
};

export function Improvement({ language, dict }: Props) {
  const pathname = usePathname();

  return (
    <aside className={styles.improve}>
      <Container className={styles.improveContainer}>
        <p>
          {dict.HelpImproveDescription}{" "}
          <ExternalLink
            style="link"
            className={styles.improveLink}
            href={`https://github.com/hongaar/updatemybrowser-v5/issues/new?assignees=hongaar&labels=content&projects=&template=content_improvement.md&title=${encodeURIComponent(
              `Improvement for page ${pathname}`,
            )}`}
          >
            {dict.HelpImproveLinkText}
          </ExternalLink>
        </p>
      </Container>
    </aside>
  );
}
