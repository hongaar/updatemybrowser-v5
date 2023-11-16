import { Container } from "../../../components/Container";

const id = "2cdb64a5-44da-4205-b1dd-cc0094a6da40";

export default function TermsAndConditions() {
  return (
    <Container>
      <iframe
        src={`https://app.termly.io/embed/terms-of-use/${id}`}
        className="termly"
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    </Container>
  );
}
