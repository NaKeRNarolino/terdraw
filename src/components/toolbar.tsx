import { ToolRepository } from "../tools/singleton";
import { Button } from "./button";
import { Container } from "./utility";

function getToolProperties() {
  // TODO
  return <></>;
}

export const Toolbar = () => {
  const tool = ToolRepository.I.getCurrentTool();

  return (
    <Container
      className="overlay-color horizontal-flex rounded-025 height-2 padding-025"
      id="toolbar"
    >
      <Button onClick={() => {}} className="toolbar-button">
        <span className="material-symbols-outlined">draw</span>
      </Button>
      <Button onClick={() => {}} className="toolbar-button margin-left-025">
        <span className="material-symbols-outlined">ink_eraser</span>
      </Button>
      <Button onClick={() => {}} className="toolbar-button margin-left-025">
        <span className="material-symbols-outlined">landscape_2</span>
      </Button>
    </Container>
  );
};
