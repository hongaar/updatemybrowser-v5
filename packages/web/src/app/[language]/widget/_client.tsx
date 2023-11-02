"use client";

import type { Dict } from "../../../dictionaries/en";

declare var UMB: any;

type Props = {
  language: string;
  dict: Dict;
};

export default function ClientWidget({ language, dict }: Props) {
  return (
    <>
      <button onClick={() => UMB.displayWidget()}>Demo</button>
    </>
  );
}
