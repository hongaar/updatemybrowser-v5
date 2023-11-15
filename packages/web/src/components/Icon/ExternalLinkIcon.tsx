import styles from "./icon.module.scss";

type Props = {
  fill?: string;
};

export function ExternalLinkIcon({ fill }: Props) {
  return (
    <svg
      className={styles.externalLinkIcon}
      style={{
        fill,
      }}
      viewBox="0 2.833 17 17"
      height="17"
      width="17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14.168 17H2.833V5.709l2.834 -0.042V2.833H0v17h17V12.75h-2.833v4.25zM8.5 2.833l2.833 2.833 -4.25 4.25 2.833 2.833 4.25 -4.25 2.833 2.833V2.833H8.5z" />
    </svg>
  );
}
