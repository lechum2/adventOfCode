import { getInput } from "../2019/common/inputReader.js";

let data = getInput("day01.txt", "\n", Number);

let count = 0;
let sumCount = 0;

for (let i = 1; i < data.length; i++) {
    if (data[i - 1] < data[i]) {
        count++;
    }
    if (i < 3) {
        continue;
    }
    if (data[i - 3] + data[i - 2] + data[i - 1] < data[i - 2] + data[i - 1] + data[i]) {
        sumCount++;
    }
}

console.log(count);
console.log(sumCount);
