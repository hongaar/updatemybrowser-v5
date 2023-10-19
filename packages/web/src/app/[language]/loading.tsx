"use client";

import { useState } from "react";
import { useTimeout } from "usehooks-ts";

export default function Loading() {
  const [visible, setVisible] = useState(false);

  function show() {
    setVisible(true);
  }

  useTimeout(show, 500);

  return visible ? "Loading" : null;
}
