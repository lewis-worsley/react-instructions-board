import React from "react";
import App from "./App";
import {
  render,
  cleanup,
  fireEvent,
} from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

//import userEvent
import userEvent from "@testing-library/user-event";

const testIds = {
  instructionInput: "instruction-input",
  addInstructionButton: "add-instruction-button",
  swapDown: "swap-down",
  swapUp: "swap-up",
  instruction: "instruction",
  instructions: "instructions",
};

describe("Instructions Board", () => {
  let getByTestId;
  let queryByTestId;
  let instructionInput;
  let addInstructionButton;
  let instructions;
  let app
  let getByText

  const sampleInstructions = [
    "Sample Instruction 1",
    "Sample Instruction 2",
    "Sample Instruction 3",
    "Sample Instruction 4"
  ];

  beforeEach(() => {
    app = render(<App />);
    getByTestId = app.getByTestId;
    queryByTestId = app.queryByTestId;
    getByText = app.getByText
    instructionInput = getByTestId(testIds.instructionInput);
    addInstructionButton = getByTestId(testIds.addInstructionButton);
    instructions = getByTestId(testIds.instructions);
  });

  afterEach(() => {
    cleanup();
  });

  const addInstruction = (instruction) => {
    fireEvent.change(instructionInput, { target: { value: instruction } });
    fireEvent.click(addInstructionButton, { button: "0" });
  };

  const addInstructionsGroup = ()=>{
    for (let i in sampleInstructions) {
      addInstruction(sampleInstructions[i]);
    }
  }
  it("Add new instruction to the list and clear input field after input", () => {
    addInstruction(sampleInstructions[0]);
    const instructionId =
      "instruction-" + sampleInstructions[0].split(" ").join("-");
    expect(instructions).toContainElement(getByTestId(instructionId));
    expect(instructionInput.value).toBeFalsy();
  });

  it("Add Multiple Instructions and check their existance", () => {
    addInstructionsGroup();
    for (let i in sampleInstructions) {
      const instructionId =
        "instruction-" + sampleInstructions[i].split(" ").join("-");
      expect(instructions).toContainElement(getByTestId(instructionId));
    }
    expect(instructions.children[0]).toBe(getByTestId(`instruction-${sampleInstructions[0].split(" ").join("-")}-li`));

    expect(instructions.children.length).toBe(4);
  });

  it("Check disabled buttons for first and last tasks", () => {
    addInstructionsGroup();
    let bottomSwapDownButton = getByTestId(`${sampleInstructions.length - 1}-swap-down`);
    let topSwapUpButton = getByTestId(`0-swap-up`);
    expect(bottomSwapDownButton).toBeDisabled();
    expect(topSwapUpButton).toBeDisabled();
  })

  it("Bring bottommost instruction to top, then disable swap-up button", ()=>{
    addInstructionsGroup();
    let bottomSwapUpButton = getByTestId(`${sampleInstructions.length - 1}-swap-up`);
    fireEvent.click(bottomSwapUpButton, {button: "0"});
    expect(instructions.children[sampleInstructions.length - 2]).toBe(getByTestId(`instruction-${sampleInstructions[sampleInstructions.length-1].split(" ").join("-")}-li`));
    bottomSwapUpButton = getByTestId(`${sampleInstructions.length - 2}-swap-up`);
    fireEvent.click(bottomSwapUpButton, {button: "0"});
    expect(instructions.children[sampleInstructions.length - 3]).toBe(getByTestId(`instruction-${sampleInstructions[sampleInstructions.length-1].split(" ").join("-")}-li`));
    bottomSwapUpButton = getByTestId(`${sampleInstructions.length - 3}-swap-up`);
    fireEvent.click(bottomSwapUpButton, {button: "0"});
    expect(instructions.children[sampleInstructions.length - 4]).toBe(getByTestId(`instruction-${sampleInstructions[sampleInstructions.length-1].split(" ").join("-")}-li`));
    bottomSwapUpButton = getByTestId(`0-swap-up`);
    expect(bottomSwapUpButton).toBeDisabled();
  })

  it("Bring topmost instruction to bottom, then disable swap-down button", ()=>{
    addInstructionsGroup();
    let topSwapDownButton = getByTestId(`0-swap-down`);
    fireEvent.click(topSwapDownButton, {button: "0"});
    expect(instructions.children[1]).toBe(getByTestId(`instruction-${sampleInstructions[0].split(" ").join("-")}-li`));
    topSwapDownButton = getByTestId(`1-swap-down`);
    fireEvent.click(topSwapDownButton, {button: "0"});
    expect(instructions.children[2]).toBe(getByTestId(`instruction-${sampleInstructions[0].split(" ").join("-")}-li`));
    topSwapDownButton = getByTestId(`2-swap-down`);
    fireEvent.click(topSwapDownButton, {button: "0"});
    expect(instructions.children[3]).toBe(getByTestId(`instruction-${sampleInstructions[0].split(" ").join("-")}-li`));
    topSwapDownButton = getByTestId(`3-swap-down`);
    expect(topSwapDownButton).toBeDisabled();
  })

});
