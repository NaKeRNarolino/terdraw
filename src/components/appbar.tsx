import { Button } from "./button";
import { PropertyBar } from "./propertyBar";
import { Container } from "./utility";

export const AppBar = () => {
  return (
    <Container
      className="overlay-color padding-025 horizontal-flex"
      id="appbar"
    >
      <Container className="overlay-color horizontal-flex rounded-025 height-4 padding-025">
        <Button onClick={() => {}}>
          <p>File</p>
        </Button>
        <Button onClick={() => {}} className="margin-left-025">
          <p>Tools & Settings</p>
        </Button>
      </Container>
      <PropertyBar />
    </Container>
  );
};
