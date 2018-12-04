var fs = require('fs');

function Square(inputLine) {
    let numbers = inputLine.match(/[0-9]+/g);
    this.index = Number(numbers[0]);
    this.left = Number(numbers[1]);
    this.top = Number(numbers[2]);
    this.right = this.left + Number(numbers[3]);
    this.bottom = this.top + Number(numbers[4]);

    this.area = function() {
        return (this.bottom - this.top) * (this.right - this.left);
    };

    this.getOverlappingSquare = function(otherSquare) {
        if(this.top > otherSquare.bottom || this.bottom < otherSquare.top)
            return null;
        if(this.left > otherSquare.right || this.right < otherSquare.left)
            return null;
        
    }
};

var inputLines = fs.readFileSync('input.txt').toString().split("\n");
var squares = [];
for(let inputLine of inputLines) {
    squares.push(new Square(inputLine));
}
console.log(squares[4].area());
for(let square of squares) {

}