import { getInput } from "./common/inputReader.js";

const asteroids = getInput("day10test1.txt", "\n", String);
const height = asteroids.length;
const width = asteroids[0].length;


function isAsteroid(x, y) {
    if (x < 0 || x >= width || y < 0 || y >= height) {
        return false;
    }
    return asteroids[y][y] === "#" ? true : false;
}

function countVisibleFor(x, y) {
    return countVisibleRightFor(x, y) + countVisibleLeftFor(x, y);
}

function countVisibleRightFor(x, y) {
    let angles = new Set();
    for (let radius = 1; radius < width; radius++) {
        let d = -radius;
        let b = y + d;
        let c = 1;
        let a = x + c;
        for (c = 1; c <= radius; c++) {
            a = x + c;
            if (isAsteroid(a, b)) {
                angles.add(c / d);
            }
        }
        c = radius;
        for (d = -radius + 1; d <= radius; d++) {
            b = y + d;
            if (isAsteroid(a, b)) {
                d === 0 ? angles.add(-1) : angles.add(c / d);
            }
        }
        d = radius;
        for (c = radius - 1; c >= 0; c--) {
            a = x + c;
            if (isAsteroid(a, b)) {
                angles.add(c / d);
            }
        }
    }
    return angles.size;
}

function countVisibleLeftFor(x, y) {
    let angles = new Set();
    for (let radius = 1; radius < width; radius++) {
        let d = -radius;
        let b = y + d;
        let c = 0;
        let a = x + c;
        for(c = 0; c >= -radius; c--) {
            a = x + c;
            if (isAsteroid(a, b)) {
                angles.add(c / d);
            }
        }
}


console.log(countVisibleRightFor(1, 0));