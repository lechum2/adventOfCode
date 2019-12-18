export class IntcodeComputer {
    constructor(data) {
        this.data = data;
    }

    compute(input = 0) {
        let output = 0;
        let index = 0;
        while (index < this.data.length) {
            let instruction = this.getInstruction(this.get(index));
            let opcode = instruction[0];
            switch (opcode) {
                case 1:
                    this.performOperation(index, instruction, (a, b) => a + b);
                    index += 4;
                    break;
                case 2:
                    this.performOperation(index, instruction, (a, b) => a * b);
                    index += 4;
                    break;
                case 3:
                    this.put(input, this.get(index + 1));
                    index += 2;
                    break;
                case 4:
                    output = this.get(this.get(index + 1));
                    index += 2;
                    break;
                case 5:
                    break;
                case 99:
                    return output;
                default:
                    console.error("Unknown operator!");
                    return;
            }
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

    getParameter(mode, index) {
        return mode ? this.get(index) : this.getPointed(index);
    }

    setResult(mode, index, value) {
        if(mode) {
            this.put(value, index);
        } else {
            this.put(value, this.get(index));
        }
    }

    performOperation(baseIndex, instruction, operation) {
        let arg1 = this.getParameter(instruction[1], baseIndex + 1);
        let arg2 = this.getParameter(instruction[2], baseIndex + 2);
        let result = operation(arg1, arg2);
        this.setResult(instruction[3], baseIndex + 3, result); 
    }
}
