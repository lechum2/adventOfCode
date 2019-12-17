export class IntcodeComputer {
    constructor(data) {
        this.data = data;
    }

    compute(input = 0) {
        let output = 0;
        let index = 0;
        let step = 0;
        while (index < this.data.length) {
            let instruction = this.getInstruction(this.get(index));
            let opcode = instruction[0];
            switch (opcode) {
                case 1:
                    this.performOperation(index, instruction, (a, b) => a + b);
                    step = 4;
                    break;
                case 2:
                    this.performOperation(index, instruction, (a, b) => a * b);
                    step = 4;
                    break;
                case 3:
                    this.put(input, this.get(index + 1));
                    step = 2;
                    break;
                case 4:
                    output = this.get(this.get(index + 1));
                    step = 2;
                    break;
                case 99:
                    return output;
                default:
                    console.error("Unknown operator!");
                    return;
            }
            index += step;
        }
    }

    put(value, index) {
        this.data[index] = value;
    }

    get(index) {
        return this.data[index];
    }

    getPointed(pointerIndex) {
        return this.data[this.data[pointerIndex]];
    }

    getInstruction(value) {
        let instruction = [];
        instruction[0] = value % 100;
        instruction[1] = Math.trunc(value / 100) % 10;
        instruction[2] = Math.trunc(value / 1000) % 10;
        instruction[3] = Math.trunc(value / 10000) % 10;
        return instruction;
    }

    performOperation(baseIndex, instruction, operation) {
        let arg1 = instruction[1]
            ? this.getPointed(baseIndex + 1)
            : this.get(baseIndex + 1);
        let arg2 = instruction[2]
            ? this.getPointed(baseIndex + 2)
            : this.get(baseIndex + 2);
        let result = operation(arg1, arg2);
        if (instruction[3]) {
            this.put(result, this.get(baseIndex + 3));
        } else {
            this.put(result, baseIndex + 3);
        }
    }
}
