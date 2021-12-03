import { getInput } from "../2019/common/inputReader.js";

let data = getInput("day03.txt");

let gammaRate = "";
let epsilonRate = "";
for (let i = 0; i < data[0].length; i++) {
    let ones = 0;
    let zeroes = 0;
    data.forEach((binaryString) => {
        switch (binaryString[i]) {
            case "1":
                ones++;
                break;
            case "0":
                zeroes++;
                break;
        }
    });
    if (ones > zeroes) {
        gammaRate += "1";
        epsilonRate += "0";
    } else {
        gammaRate += "0";
        epsilonRate += "1";
    }
}

console.log(gammaRate);
console.log(epsilonRate);
console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));
