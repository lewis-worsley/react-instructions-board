# React(debugging): Fix Instructions Board

## Environment 

- React Version: 16.13.1
- Node Version: 14(LTS)
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/rQaOppD3lkEsCDQlFdn1Tg/ezgif.com-gif-maker%20(1).gif)

## Functionality Requirements

The component must have the following functionalities:

 - Each instruction should be wrapped inside an `<li>`
 - Each instruction should have 'Sr. No.' rendered along with it.
 - The instructions should have 2 buttons, move up and move down.
 - Move Up: On clicking this button, the instruction should be moved up one position in the list.
 - Move Down: On clicking this button, the instruction should be moved down one position in the list.
 - The Move Up button for the topmost instruction should be disabled.
 - The Move Down button for the bottom-most instruction should be disabled.
 - On changing the order of instructions, the 'Sr. No' rendered with it should change.
 - If no instruction has been added or the instruction input is blank and Add Instruction button is clicked, the error message "Please enter an instruction" should be displayed for 3seconds.


## Project Specifications

**Read Only Files**
- src/App.test.js
- src/App.js
- src/index.css
- src/index.js
- src/instructions.json
- src/components/instruction-board/index.css

**Commands**
- run: 
```bash
npm start
```
- install: 
```bash
npm install
```
- test: 
```bash
npm test
```
