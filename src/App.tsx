import { useState } from "react";
import "./App.css";
import { AppBar } from "./components/appbar";
import { Button } from "./components/button";
import { Canvas } from "./components/canvas";
import { Toolbar } from "./components/toolbar";
import { Container } from "./components/utility";
import { CanvasLayer } from "./layer/models";

function App() {
  const [selectedLayer, setSelectedLayer] = useState(CanvasLayer.Heightmap);

  return (
    <div className="App">
      <AppBar />
      <Container className="center-contents">
        <Canvas _selectedLayer={CanvasLayer.Heightmap} />
      </Container>
      <Toolbar />
    </div>
  );
}

export default App;
