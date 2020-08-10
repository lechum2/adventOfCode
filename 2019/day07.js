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

function calculateLoopedSignal(sequence, amplifiers) {
    for (let i = 0; i < 5; i++) {
        amplifiers[i].reset();
        amplifiers[i].compute();
        amplifiers[i].addInput(sequence[i]);
    }

    let amplifierIndex = 0;
    let signal = 0;
    while (!amplifiers[4].hasFinishedOperation()) {
        signal = amplifiers[amplifierIndex].addInput(signal);
        signal = amplifiers[amplifierIndex].resumeOperation();
        amplifiers[amplifierIndex].resumeOperation();
        amplifierIndex = (amplifierIndex + 1) % 5;
    }
    return signal;
}

let amplifiers = [];
for (let i = 0; i < 5; i++) {
    amplifiers.push(new IntcodeComputer(input));
}

const loopedSequences = permutator([5, 6, 7, 8, 9]);
let maxLoopedSignal = 0;
for (const loopedSequence of loopedSequences) {
    let loopedSequenceSignal = calculateLoopedSignal(loopedSequence, amplifiers);
    if (loopedSequenceSignal > maxLoopedSignal) {
        maxLoopedSignal = loopedSequenceSignal;
    }
}

console.log(maxLoopedSignal);
