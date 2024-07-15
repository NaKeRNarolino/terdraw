import { Button } from "./button";
import { Container } from "./utility";

export const AppBar = () => {
  return (
    <Container
      className="overlay-color padding-025 horizontal-flex"
      id="appbar"
    >
      <Container className="overlay-color horizontal-flex rounded-025 height-2 padding-025">
        <Button onClick={() => {}}>
          <p>File</p>
        </Button>
        <Button onClick={() => {}} className="margin-left-025">
          <p>Tools & Settings</p>
        </Button>
      </Container>
      <Container className="overlay-color horizontal-flex rounded-025 height-2 padding-025 margin-left-025">
        <Button onClick={() => {}}>
          <p>File</p>
        </Button>
        <Button onClick={() => {}} className="margin-left-025">
          <p>Tools & Settings</p>
        </Button>
      </Container>
    </Container>
  );
};
