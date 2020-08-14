import { getInput } from "./common/inputReader.js";

const width = 25;
const height = 6;
let digits = getInput("day08.txt", "", Number);

let layerIndex = 0;
let digitsIndex = 0;
let image = [];
while (digitsIndex < digits.length) {
    image[layerIndex] = [];
    for (let y = 0; y < height; y++) {
        image[layerIndex][y] = [];
        for (let x = 0; x < width; x++) {
            image[layerIndex][y][x] = digits[digitsIndex];
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
        let value = image[minZeroesLayerIndex][y][x];
        if (value == 1) {
            onesNum++;
        } else if (value == 2) {
            twosNum++;
        }
    }
}
console.log(onesNum * twosNum);

let finalImage = image[0];

for (const layer of image) {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            if (finalImage[y][x] === 2) {
                finalImage[y][x] = layer[y][x];
            }
        }
    }
}
for (let y = 0; y < height; y++) {
    process.stdout.write("\n");
    for (let x = 0; x < width; x++) {
        if (finalImage[y][x] === 0) {
            process.stdout.write("█");
        } else if (finalImage[y][x] == 1) {
            process.stdout.write("░");
        }
    }
}
