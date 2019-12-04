import {getInput} from './common/inputReader.mjs'

class Grid {
    constructor(size, centralPortIndex, crossingSymbol) {
        this.size = size;
        this.centralPortIndex = centralPortIndex;
        this.innerGrid = new Array(size);
        for(let i = 0; i < size; i++) {
            this.innerGrid[i] = new Array(size);
        }
        this.crossingSymbol = crossingSymbol;
    }

    markPassing(x, y, symbol, step) {
        if(x >= this.size || y >= this.size || x < 0 || y < 0) {
            return;
        }

        if(this.innerGrid[x][y] === undefined) {
            this.innerGrid[x][y] = symbol + step;
        } else if(this.innerGrid[x][y].charAt(0) !== symbol) {
	    let otherStep = parseInt(this.innerGrid[x][y].substr(1));
            this.innerGrid[x][y] = this.crossingSymbol + (step + otherStep);
        }
    }

    addWire(wire, symbol) {
        let wireArray = wire.toString().split(',');
        let positionX = this.centralPortIndex;
        let positionY = this.centralPortIndex;
	    let step = 0;
        for (const element of wireArray) {
            const direction = element.charAt(0);
            let value = element.substr(1);
            value = parseInt(value);
            switch(direction) {
                case 'R':
                    for(let i = positionX + 1; i <= positionX + value; i++) {
			    step++;
                        this.markPassing(i, positionY, symbol, step);
                    }
                    positionX += value;
                    break;
                case 'L':
			    step++;
                    for(let i = positionX - 1; i >= positionX - value; i--) {
                        this.markPassing(i, positionY, symbol, step);
                    }
                    positionX -= value;
                    break;
                case 'U':
                    for(let i = positionY + 1; i <= positionY + value; i++) {
			    step++;
                        this.markPassing(positionX, i, symbol, step);
                    }
                    positionY += value;
                    break;
                case 'D':
                    for(let i = positionY - 1; i >= positionY - value; i--) {
			    step++;
                        this.markPassing(positionX, i, symbol, step);
                    }
                    positionY -=value;
                    break;
            }
        }
    }

    getClosestCrossing() {
        let closest = this.size + this.size;
        for(let x = 0; x < this.size; x++) {
            for(let y = 0; y < this.size; y++) {
                if(this.innerGrid[x][y] && this.innerGrid[x][y].unshift() === this.crossingSymbol) {
                    let distance = Math.abs(x - this.centralPortIndex) +Math.abs(y - this.centralPortIndex);
                    if(distance < closest) {
                        closest = distance;
                    }
                }
            }
        }
        return closest;
    }
	getNearestCrossing() {
		let nearest = this.size * this.size;
for(let x = 0; x < this.size; x++) {                for(let y = 0; y < this.size; y++) {
                if(this.innerGrid[x][y] && this.innerGrid[x][y].unshift() === this.crossingSymbol) {                                                                let distance = parseInt(this.innerGrid[x][y].substr(1));                                                       if(distance <nearest ) {
                        nearest = distance;                         }                                           }                                           }                                           }
		return nearest;
	}
}

var grid = new Grid(10000, 5000, '#');
var wires = getInput('day03.txt');
grid.addWire(wires[0], '*');
grid.addWire(wires[1], '.');
console.log(grid.getClosestCrossing());

