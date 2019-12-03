import {getInput} from './common/inputReader.mjs'

class Grid {
    constructor(size, centralPortIndex) {
        this.size = size;
        this.centralPortIndex = centralPortIndex;
        this.innerGrid = new Array();
    }

    addWire(wire) {
        let wireArray = wire.toString().split(',');
        for (const element of wireArray) {
            const direction = element.charAt(0);
            let value = element.substr(1);
            value = parseInt(value);
            console.log(direction);
            console.log(value);
        }
    }
}

var wires = getInput('day03.txt');
var grid = new Grid(2000, 1000);
grid.addWire(wires[0]);

