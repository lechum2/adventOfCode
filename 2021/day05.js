import { getInput } from "./common/httpInputReader.js";

class Diagram {
    constructor() {
        this.field = new Array();
        this.width = 0;
        this.height = 0;
    }
    addLine(startX, startY, endX, endY) {
        if (startX === endX) {
            this.addHorizontalLine(startX, startY, endY);
        } else if (startY === endY) {
            this.addVerticalLine(startX, startY, endX);
        } else if ((startX > endX && startY > endY) || (startX < endX && startY < endY)) {
            this.addDescendingDiagonal(startX, startY, endX, endY);
        } else {
            this.addAscendingDiagonal(startX, startY, endX, endY);
        }
    }
    addHorizontalLine(x, startY, endY) {
        let smallerY = Math.min(startY, endY);
        let biggerY = Math.max(startY, endY);
        for (let i = 0; i <= biggerY - smallerY; i++) {
            this.mark(x, smallerY + i);
        }
    }
    addVerticalLine(startX, y, endX) {
        let smallerX = Math.min(startX, endX);
        let biggerX = Math.max(startX, endX);
        for (let i = 0; i <= biggerX - smallerX; i++) {
            this.mark(smallerX + i, y);
        }
    }
    addDescendingDiagonal(startX, startY, endX, endY) {
        let biggerX = Math.max(startX, endX);
        let smallerX = Math.min(startX, endX);
        let smallerY = Math.min(startY, endY);
        for (let i = 0; i <= biggerX - smallerX; i++) {
            this.mark(smallerX + i, smallerY + i);
        }
    }
    addAscendingDiagonal(startX, startY, endX, endY) {
        let biggerX = Math.max(startX, endX);
        let smallerX = Math.min(startX, endX);
        let biggerY = Math.max(startY, endY);
        for (let i = 0; i <= biggerX - smallerX; i++) {
            this.mark(smallerX + i, biggerY - i);
        }
    }
    mark(x, y) {
        this.width = this.width < x + 1 ? x + 1 : this.width;
        this.height = this.height < y + 1 ? y + 1 : this.height;
        if (!this.field[x]) {
            this.field[x] = new Array();
        }
        if (!this.field[x][y]) {
            this.field[x][y] = 0;
        }
        this.field[x][y]++;
    }
    countOverlaps() {
        let count = 0;
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (this.field[x] && this.field[x][y] && this.field[x][y] > 1) {
                    count++;
                }
            }
        }
        return count;
    }
    print() {
        for (let x = 0; x < this.width; x++) {
            let line = "";
            for (let y = 0; y < this.height; y++) {
                if (this.field[x] && this.field[x][y]) {
                    line += this.field[x][y];
                } else {
                    line += ".";
                }
            }
            console.log(line);
        }
    }
}

let data = await getInput(2021, 5);
let diagram = new Diagram();
for (const dataLine of data) {
    const points = dataLine.split(" -> ");
    const point1 = points[0].split(",").map(Number);
    const point2 = points[1].split(",").map(Number);
    diagram.addLine(point1[0], point1[1], point2[0], point2[1]);
}
console.log(diagram.countOverlaps());