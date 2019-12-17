import { getInput } from "./common/inputReader.js";
import { IntcodeComputer } from "./common/IntcodeComputer.js";

let input = getInput("day05.txt", ",", Number);
let intcode = new IntcodeComputer(input);
let result = intcode.compute(1);
console.log(result);