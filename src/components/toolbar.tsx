import { useState } from "react";
import { ToolRepository } from "../tools/singleton";
import { Button } from "./button";
import { Container } from "./utility";
import { ToolTypes as ToolTypes } from "../tools/models";

function getToolProperties() {
  // TODO
  return <></>;
}

export const Toolbar = () => {
  const [selectedTool, setSelectedTool] = useState(
    ToolRepository.getCurrentTool()
  );

  const selectTool = (tool: ToolTypes) => {
    ToolRepository.setCurrentTool(tool);
    setSelectedTool(ToolRepository.getCurrentTool());
    console.warn(tool.toString);
  };

  return (
    <Container
      className="overlay-color horizontal-flex rounded-025 height-2 padding-025"
      id="toolbar"
    >
      <Button
        onClick={() => {
          selectTool(ToolTypes.Draw);
        }}
        className="toolbar-button"
        selected={selectedTool == ToolTypes.Draw}
      >
        <span className="material-symbols-outlined">draw</span>
      </Button>
      <Button
        onClick={() => {
          selectTool(ToolTypes.Eraser);
        }}
        className="toolbar-button margin-left-025"
        selected={selectedTool == ToolTypes.Eraser}
      >
        <span className="material-symbols-outlined">ink_eraser</span>
      </Button>
      <Button
        onClick={() => {
          selectTool(ToolTypes.WorldProperties);
        }}
        className="toolbar-button margin-left-025"
        selected={selectedTool == ToolTypes.WorldProperties}
      >
        <span className="material-symbols-outlined">landscape_2</span>
      </Button>
    </Container>
  );
};
