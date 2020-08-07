import { getInput } from "./common/inputReader.js";
import { IntcodeComputer } from "./common/IntcodeComputer.js";
import { permutator } from "./common/permutator.js";

const input = getInput("day07.txt", ",", Number);
const intcode = new IntcodeComputer(input);

const sequences = permutator([0, 1, 2, 3, 4]);

let maxSignal = 0;

for (const sequence of sequences) {
    let betweenSignal = 0;
    for (const value of sequence) {
        betweenSignal = intcode.compute(value, betweenSignal);
        intcode.reset();
    }
    if (betweenSignal > maxSignal) {
        maxSignal = betweenSignal;
    }
}

console.log(maxSignal);
