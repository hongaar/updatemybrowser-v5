"use client";

import { useState } from "react";
import { useTimeout } from "usehooks-ts";
import { Container } from "../../components/Container";

export default function Loading() {
  const [visible, setVisible] = useState(false);

  function show() {
    setVisible(true);
  }

  useTimeout(show, 500);

  return visible ? <Container>Loading...</Container> : null;
}
