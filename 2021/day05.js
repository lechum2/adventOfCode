import { getInput } from "./common/httpInputReader.js";

class Diagram {
    constructor() {
        this.field = new Array();
        this.width = 0;
        this.height = 0;
    }
    addLine(startX, startY, endX, endY) {
        this.width = Math.max(startX, endX, this.width);
        this.height = Math.max(startY, endY, this.height);

        let biggerX = startX;
        let smallerX = endX;
        if (startX < endX) {
            biggerX = endX;
            smallerX = startX;
        }
        let biggerY = startY;
        let smallerY = endY;
        if (startY < endY) {
            biggerY = endY;
            smallerY = startY;
        }
        for (let x = smallerX; x <= biggerX; x++) {
            if (!this.field[x]) {
                this.field[x] = new Array();
            }
            for (let y = smallerY; y <= biggerY; y++) {
                if (!this.field[x][y]) {
                    this.field[x][y] = 0;
                }
                this.field[x][y]++;
            }
        }
    }
    countOverlaps() {
        let count = 0;
        for (let x = 0; x <= this.width; x++) {
            for (let y = 0; y <= this.height; y++) {
                if (this.field[x] && this.field[x][y] && this.field[x][y] > 1) {
                    count++;
                }
            }
        }
        return count;
    }
    print() {
        for (let x = 0; x <= this.width; x++) {
            let line = '';
            for (let y = 0; y <= this.height; y++) {
                if (this.field[x] && this.field[x][y]) {
                    line += this.field[x][y];
                } else {
                    line += ".";
                }
                console.log(line);
            }
        }
    }

}

let data = await getInput(2021, 5);
let diagram = new Diagram();
for (const dataLine of data) {
    const points = dataLine.split(" -> ");
    const point1 = points[0].split(",").map(Number);
    const point2 = points[1].split(",").map(Number);
    if (point1[0] === point2[0] || point1[1] === point2[1]) {
        diagram.addLine(point1[0], point1[1], point2[0], point2[1]);
    }
}
console.log(diagram.countOverlaps());