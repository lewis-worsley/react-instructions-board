import React from "react";
import "./App.css";
import "h8k-components";

import InstructionBoard from "./components/Instruction-board";

const title = "Instructions Lists";

const App = () => {
  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <InstructionBoard />
    </div>
  );
};

export default App;
