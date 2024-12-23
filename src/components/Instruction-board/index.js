import React from "react";
import "./index.css";

export default function InstructionBoard() {
	let [instructions, setInstructions] = React.useState([]);
	let [instruction, setInstruction] = React.useState("");
	const [errMsg, setErrMsg] = React.useState("");
	const handleChange = (event) => {
		setInstruction(event.target.value);
	};

	const addInstruction = (event) => {
		event.preventDefault();
		setErrMsg("");
		if (instruction.trim() === "") {
			setErrMsg("Please enter an instruction.");
			setTimeout(() => {
				setErrMsg("");
			}, 3000);
		} else {
			setInstructions([...instructions, instruction]);
			setInstruction("");
		}
	};

	const swapDown = (index) => {
		if (index < instructions.length - 1) {
			const newInstructions = [...instructions];
			const temp = newInstructions[index];
			newInstructions[index] = newInstructions[index + 1];
			newInstructions[index + 1] = temp;
			setInstructions(newInstructions);
		}
	};

	const swapUp = (index) => {
		if (index > 0) {
			const newInstructions = [...instructions];
			const temp = newInstructions[index];
			newInstructions[index] = newInstructions[index - 1];
			newInstructions[index - 1] = temp;
			setInstructions(newInstructions);
		}
	};

	return (
		<div className="mt-50 layout-column justify-content-center align-items-center">
			<div>
				<form onSubmit={addInstruction}>
					<section
						className="my-30 layout-row align-items-center justify-content-center"
						style={{ width: "1000px" }}
					>
						<input
							id="instruction-input"
							type="text"
							placeholder="New Instruction"
							data-testid="instruction-input"
							style={{ width: "80%" }}
							value={instruction}
							onChange={handleChange}
						/>
						<button
							type="submit"
							className="ml-30"
							data-testid="add-instruction-button"
							style={{ width: "20%" }}
						>
							Add Instruction
						</button>
					</section>
				</form>
				{errMsg !== "" && <span data-testid="error-message" className="error">{errMsg}</span>}
			</div>
			<div className="card outlined mt-0" style={{ width: "800px" }}>
				<div className="card-text" >
					<h4>Instructions</h4>
					<ul className="styled mt-50" data-testid="instructions">
						{instructions.map((instruction, i) => (
							<li className="slide-up-fade-in" key={i} data-testid={`instruction-${instruction.split(" ").join("-")}-li`}>
								<div
									className="li-content layout-row justify-content-between align-items-center py-10"
								>
									<span data-testid={`${i + 1}`}>{i + 1}</span>
									<span
										data-testid={`instruction-${instruction
											.split(" ")
											.join("-")}`}
									>
										{instruction}
									</span>
									<div className="icons">
										<button
											disabled={i === instructions.length - 1}
											className="icon-only x-medium mx-2"
											data-testid={`${i}-swap-down`}
											onClick={() => swapDown(i)}
										>
											<i className="material-icons">arrow_drop_down_icon</i>
										</button>
										<button
											disabled={i === 0}
											className="icon-only x-medium mx-2"
											data-testid={`${i}-swap-up`}
											onClick={() => swapUp(i)}
										>
											<i className="material-icons">arrow_drop_up_icon</i>
										</button>
									</div>
								</div>
							</li>
						))}
						{/* <div className="li-content layout-row justify-content-between align-items-center">
                <span>Instruction-1</span>
                <div className="icons">
                  <button className="icon-only x-medium mx-2">
                    <i className="material-icons">arrow_drop_down_icon</i>
                  </button>
                  <button className="icon-only x-medium mx-2">
                    <i className="material-icons">arrow_drop_up_icon</i>
                  </button>
                </div>
              </div> */}
					</ul>
				</div>
			</div>
		</div>
	);
}
