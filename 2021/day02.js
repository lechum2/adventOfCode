import { getInput } from "../2019/common/inputReader.js";

let data = getInput("day02.txt");
data = data.map((value) => value.split(" "));
let horizontalPosition = 0;
let depth = 0;
let aim = 0;
let aimDepth = 0;

data.forEach((step) => {
    const stepValue = Number.parseInt(step[1]);
    switch (step[0]) {
        case "forward":
            horizontalPosition += stepValue;
            aimDepth += aim * stepValue;
            break;
        case "up":
            depth -= stepValue;
            aim -= stepValue;
            break;
        case "down":
            depth += stepValue;
            aim += stepValue;
            break;
    }
});

console.log(horizontalPosition * depth);
console.log(horizontalPosition * aimDepth);
