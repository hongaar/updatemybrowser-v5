import type { IconManagerType } from "sanity-plugin-icon-manager";
import styled from "../utils/styled-components.js";
import { iconPreview } from "./IconPreview.jsx";

type Icon = {
  predefined?: IconManagerType;
  custom_svg?: string;
};

interface Props {
  icon: Icon;
  subIcon: Icon;
}

const IconWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const MainIcon = styled.div`
  position: absolute !important;
  width: 90% !important;
  height: 90% !important;
`;

const SubIcon = styled.div`
  position: absolute !important;
  width: 30% !important;
  height: 30% !important;
  left: auto !important;
  top: auto !important;
  bottom: 0 !important;
  right: 0 !important;
`;

function IconWithSubIconPreview({ icon, subIcon }: Props) {
  return (
    <IconWrapper>
      {icon ? <MainIcon>{iconPreview({ icon })}</MainIcon> : null}
      {subIcon ? <SubIcon>{iconPreview({ icon: subIcon })}</SubIcon> : null}
    </IconWrapper>
  );
}

export function iconWithSubIconPreview(props: Props) {
  return <IconWithSubIconPreview {...props} />;
}
