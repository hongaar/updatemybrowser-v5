import Link from "next/link";
import { Container } from "../components/Container";
import { Document } from "../components/Document";
import english from "../dictionaries/en";

export default function NotFound() {
  const dict = english;

  return (
    <Document>
      <Container>
        <h2>{dict.NotFound}</h2>
        <p>{dict.NotFoundDescription}</p>
        <Link href="/">{dict.NotFoundButton}</Link>
      </Container>
    </Document>
  );
}
