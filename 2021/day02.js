import { getInput } from "../2019/common/inputReader.js";

let data = getInput("day02.txt");
data = data.map((value) => value.split(" "));
let horizontalPosition = 0;
let depth = 0;
data.forEach((step) => {
    switch (step[0]) {
        case "forward":
            horizontalPosition += Number.parseInt(step[1]);
            break;
        case "up":
            depth -= Number.parseInt(step[1]);
            break;
        case "down":
            depth += Number.parseInt(step[1]);
            break;
    }
});

console.log(horizontalPosition * depth);