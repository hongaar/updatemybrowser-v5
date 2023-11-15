import { Container } from "../../components/Container";
import { Delay } from "../../components/Delay";
import { Spinner } from "../../components/Spinner";

export default function Loading() {
  return (
    <Delay seconds={0.5}>
      <Container>
        <h2>
          <Spinner size="1.5em" />
          Loading...
        </h2>
      </Container>
    </Delay>
  );
}
