import { mediaPreview, type IconManagerType } from "sanity-plugin-icon-manager";

interface Props {
  icon: {
    predefined?: IconManagerType;
    custom_svg?: string;
  };
}

function Icon({ icon }: Props) {
  return icon && icon.predefined ? (
    mediaPreview(icon.predefined)
  ) : icon && icon.custom_svg ? (
    <img
      alt=""
      src={`data:image/svg+xml;utf8,${encodeURIComponent(icon.custom_svg)}`}
    />
  ) : null;
}

export function iconPreview(props: Props) {
  return <Icon {...props} />;
}
