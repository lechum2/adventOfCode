var fs = require('fs');

function Square(top, left, right, bottom) {
    this.top = top;
    this.left = left;
    this.right = right;
    this.bottom = bottom;

    this.fromString = function(inputLine) {
        let numbers = inputLine.match(/[0-9]+/g);
        this.index = Number(numbers[0]);
        this.left = Number(numbers[1]);
        this.top = Number(numbers[2]);
        this.right = this.left + Number(numbers[3] - 1);
        this.bottom = this.top + Number(numbers[4] - 1);
    };

    this.contains = function(x, y) {
        if(x >= this.left && x <= this.right && y >= this.top && y <= this.bottom) {
            return true;
        }
        return false;
    };
    this.isOverlapping = function(otherSquare) {
        if(this.top > otherSquare.bottom || this.bottom < otherSquare.top)
            return false;
        if(this.left > otherSquare.right || this.right < otherSquare.left)
            return false;

        return true;
    };
};

var inputLines = fs.readFileSync('input.txt').toString().split("\n");
var squares = [];
for(let inputLine of inputLines) {
    let square = new Square();
    square.fromString(inputLine);
    squares.push(square);
}
let maxWidth = Math.max(...squares.map(square => square.right));
let maxHeight = Math.max(...squares.map(square => square.bottom));

let result = 0;
for(let x = 0; x < maxWidth + 1; x++) {
    for(let y = 0; y < maxHeight + 1; y++) {
        let contains = 0;
        for(let square of squares) {
            if(square.contains(x, y)) {
                contains++;
            }
            if(contains >= 2) {
                result++;
                break;
            }
        }
    }
}
console.log(result);