import { getInput } from "./common/inputReader.js";

const width = 25;
const height = 6;
let digits = getInput("day08.txt", "", Number);

let layerIndex = 0;
let digitsIndex = 0;
let image = [];
while (digitsIndex < digits.length) {
    image[layerIndex] = [];
    for (let x = 0; x < width; x++) {
        image[layerIndex][x] = [];
        for (let y = 0; y < height; y++) {
            image[layerIndex][x][y] = digits[digitsIndex];
            digitsIndex++;
        }
    }
    layerIndex++;
}

let minZeroesNum = 15000;
let minZeroesLayerIndex = 0;
for (let l = 0; l < image.length; l++) {
    let zeroesNum = image[l].reduce(
        (accumulator, row) => accumulator + row.filter((value) => value === 0).length,
        0
    );
    if (zeroesNum < minZeroesNum) {
        minZeroesNum = zeroesNum;
        minZeroesLayerIndex = l;
    }
}

let onesNum = 0;
let twosNum = 0;
for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
        let value = image[minZeroesLayerIndex][x][y];
        if (value == 1) {
            onesNum++;
        } else if (value == 2) {
            twosNum++;
        }
    }
}
console.log(onesNum * twosNum);
