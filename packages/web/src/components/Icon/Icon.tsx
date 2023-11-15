import type { Icon } from "@updatemybrowser/client";
import styles from "./icon.module.scss";

type Props = {
  icon: Icon;
  mode?: "img" | "svg";
  className?: string;
  alt?: string;
  title?: string;
  tooltip?: string;
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
  mode = "img",
  className,
  alt,
  title,
  tooltip,
  height,
  cssHeight,
  width,
  cssWidth,
  size,
  cssSize,
}: Props) {
  return mode === "img" ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`${styles.img} ${className || ""}`}
      alt={alt}
      title={title}
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
  ) : (
    <span
      className={`${styles.svgWrapper} ${className || ""}`}
      title={title || alt}
      data-tooltip={tooltip}
      style={{
        width: cssWidth || cssSize || width || size,
        height: cssHeight || cssSize || height || size,
      }}
      dangerouslySetInnerHTML={{
        __html: icon.predefined?.metadata.inlineSvg || icon.custom_svg || "",
      }}
    />
  );
}
