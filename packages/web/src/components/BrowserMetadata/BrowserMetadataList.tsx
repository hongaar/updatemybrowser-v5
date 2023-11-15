import type { ReactNode } from "react";
import styles from "./browserMetadata.module.scss";

type Props = {
  children: ReactNode;
};

export function BrowserMetadataList({ children }: Props) {
  return <div className={styles.metadataList}>{children}</div>;
}
