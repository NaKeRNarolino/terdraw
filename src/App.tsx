import "./App.css";
import { AppBar } from "./components/appbar";
import { Canvas } from "./components/canvas";
import { Toolbar } from "./components/toolbar";
import { Container } from "./components/utility";

function App() {
  return (
    <div className="App">
      <AppBar />
      <Container className="center-contents">
        <Canvas />
      </Container>
      <Toolbar />
    </div>
  );
}

export default App;
