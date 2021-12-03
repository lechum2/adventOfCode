import { getInput } from "../2019/common/inputReader.js";

let data = getInput("day03.txt");

let gammaRate = "";
let epsilonRate = "";
let oxygenGeneratorRating = data;
let co2ScrubberRating = data;
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
    if (ones >= zeroes) {
        gammaRate += "1";
        epsilonRate += "0";
    } else {
        gammaRate += "0";
        epsilonRate += "1";
    }
    ones = 0;
    zeroes = 0;
    oxygenGeneratorRating.forEach((binaryString) => {
        switch (binaryString[i]) {
            case "1":
                ones++;
                break;
            case "0":
                zeroes++;
                break;
        }
    });
    oxygenGeneratorRating = oxygenGeneratorRating.filter((binaryValue) => {
        if (ones >= zeroes) {
            return binaryValue[i] === "1";
        } else {
            return binaryValue[i] === "0";
        }
    });

    if (co2ScrubberRating.length > 1) {
        ones = 0;
        zeroes = 0;
        co2ScrubberRating.forEach((binaryString) => {
            switch (binaryString[i]) {
                case "1":
                    ones++;
                    break;
                case "0":
                    zeroes++;
                    break;
            }
        });
        co2ScrubberRating = co2ScrubberRating.filter((binaryValue) => {
            if (ones >= zeroes) {
                return binaryValue[i] === "0";
            } else {
                return binaryValue[i] === "1";
            }
        });
    }
}

console.log(gammaRate);
console.log(epsilonRate);
console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));

console.log(oxygenGeneratorRating);
console.log(co2ScrubberRating);
console.log(parseInt(oxygenGeneratorRating[0], 2) * parseInt(co2ScrubberRating[0], 2));