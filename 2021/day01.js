import { getInput } from "../2019/common/inputReader.js";

let data = getInput("day01.txt", "\n", Number);

let count = 0;

for(let i = 1; i < data.length; i++) {
    if(data[i - 1] < data[i]) {
        count++;
    }
}

console.log(count);