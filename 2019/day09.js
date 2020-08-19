import { getInput } from "./common/inputReader.js";
import { IntcodeComputer } from "./common/IntcodeComputer.js";

const input = getInput("day09.txt", ",", Number);
const boost = new IntcodeComputer(input);

console.log(boost.compute(1));
