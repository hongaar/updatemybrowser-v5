import Link from "next/link";
import type { ReactNode } from "react";
import { ExternalLinkIcon } from "../Icon";

type Props = {
  href?: string;
  children: ReactNode;
};

export function BrowserLinkButton({ children, href }: Props) {
  if (!href) {
    return null;
  }

  return (
    <p>
      <Link
        tabIndex={0}
        role="button"
        target="_blank"
        rel="noopener noreferrer"
        href={href}
      >
        <ExternalLinkIcon fill={"currentColor"} /> {children}
      </Link>
    </p>
  );
}
