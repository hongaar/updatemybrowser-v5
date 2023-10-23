import styles from "./spinner.module.scss";

type Props = {
  size?: string | number;
};

export function Spinner({ size = 48 }: Props) {
  return (
    <span
      className={styles.spinner}
      style={{
        fontSize: typeof size === "number" ? `${size}px` : size,
      }}
    ></span>
  );
}
