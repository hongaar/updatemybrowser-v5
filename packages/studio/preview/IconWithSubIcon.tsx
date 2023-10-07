import type { IconManagerType } from "sanity-plugin-icon-manager";
import styled from "./../utils/styled-components.js";

interface IconWithSubIconProps {
  icon: IconManagerType;
  subIcon: IconManagerType;
}

const IconWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Icon = styled.img`
  width: 90% !important;
  height: 90% !important;
`;

const SubIcon = styled.img`
  width: 30% !important;
  height: 30% !important;
  left: auto !important;
  top: auto !important;
  bottom: 0 !important;
  right: 0 !important;
`;

function IconWithSubIcon({ icon, subIcon }: IconWithSubIconProps) {
  return (
    <IconWrapper>
      {icon ? <Icon src={icon.metadata.url} alt="Icon" /> : null}
      {subIcon ? <SubIcon src={subIcon.metadata.url} alt="SubIcon" /> : null}
    </IconWrapper>
  );
}

export function iconWithSubIcon(props: IconWithSubIconProps) {
  return <IconWithSubIcon {...props} />;
}
