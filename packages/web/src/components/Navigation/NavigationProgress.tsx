import { Suspense } from "react";
import { Client } from "./Client";

export function NavigationProgress() {
  return (
    <Suspense fallback={null}>
      <Client />
    </Suspense>
  );
}
