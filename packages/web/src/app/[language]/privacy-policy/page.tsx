import { Container } from "../../../components/Container";

const id = "bf8238ac-7d7d-4131-a28a-008941a93df2";

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
