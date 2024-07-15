import "./App.css";
import { AppBar } from "./components/appbar";
import { Canvas } from "./components/canvas";
import { Toolbar } from "./components/toolbar";

function App() {
  return (
    <div className="App">
      <AppBar />
      <Canvas />
      <Toolbar />
    </div>
  );
}

export default App;
