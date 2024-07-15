import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Container } from "./components/utility";
import { AppBar } from "./components/appbar";
import { Canvas } from "./components/canvas";

function App() {
  return (
    <div className="App">
      <AppBar />
      <Canvas />
    </div>
  );
}

export default App;
