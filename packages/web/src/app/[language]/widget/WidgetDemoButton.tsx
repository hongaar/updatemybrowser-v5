import type { ReactNode } from "react";
import { WidgetDemoButtonClient } from "./WidgetDemoButtonClient";

type Props = {
  children?: ReactNode;
};

export function WidgetDemoButton({ children }: Props) {
  return (
    <p>
      <WidgetDemoButtonClient>{children}</WidgetDemoButtonClient>
    </p>
  );
}
