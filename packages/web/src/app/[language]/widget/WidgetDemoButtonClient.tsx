"use client";

import type { ReactNode } from "react";

declare var UMB: any;

type Props = {
  children?: ReactNode;
};

export function WidgetDemoButtonClient({ children }: Props) {
  return <button onClick={() => UMB.displayWidget()}>{children}</button>;
}
