import { Container } from "../../../components/Container";

const id = "b6530434-96f4-4112-891a-1fb96e861902";

export default function CookiePolicy() {
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
