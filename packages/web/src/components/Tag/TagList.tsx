import { Children, type ReactNode } from "react";
import styles from "./tag.module.scss";

type Props = {
  children: ReactNode;
};

export function TagList({ children }: Props) {
  return (
    <ul className={styles.tagList}>
      {Children.map(children, (child) => (
        <li className={styles.tagListItem}>{child}</li>
      ))}
    </ul>
  );
}
