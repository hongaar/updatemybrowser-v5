import type { Icon } from "@updatemybrowser/client";
import styles from "./icon.module.scss";

type Props = {
  icon: Icon;
  className?: string;
  alt?: string;
} & (
  | {
      width: number;
      height: number;
      cssWidth?: number | string;
      cssHeight?: number | string;
      size?: never;
      cssSize?: never;
    }
  | {
      width?: never;
      cssWidth?: never;
      height?: never;
      cssHeight?: never;
      size: number;
      cssSize?: number | string;
    }
);

export function Icon({
  icon,
  className,
  alt,
  height,
  cssHeight,
  width,
  cssWidth,
  size,
  cssSize,
}: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`${styles.img} ${className || ""}`}
      alt={alt}
      style={{
        width: cssWidth || cssSize || width || size,
        height: cssHeight || cssSize || height || size,
      }}
      height={size || height}
      width={size || width}
      src={`data:image/svg+xml;utf8,${encodeURIComponent(
        icon.predefined?.metadata.inlineSvg || icon.custom_svg || "",
      )}`}
    />
  );
}
