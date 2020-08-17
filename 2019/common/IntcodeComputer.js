export class IntcodeComputer {
    StatusEnum = Object.freeze({
        NEW: 0,
        FINISHED: 1,
        OPERATION: 2,
        REFRESHED: 3,
        INPUT_PAUSE: 4,
        OUTPUT_PAUSE: 5,
        ERROR: 6,
    });

    constructor(data) {
        this.originalData = [...data];
        this.reset();
        this.status = this.StatusEnum.NEW;
    }

    reset() {
        this.data = [...this.originalData];
        this.status = this.StatusEnum.REFRESHED;
        this.output = undefined;
        this.index = 0;
        this.inputIndex = 0;
        this.input = [];
        this.relativeBase = 0;
    }

    compute(...input) {
        this.input = input;
        return this.runMainLoop();
    }

    runMainLoop() {
        while (this.index < this.data.length) {
            let instruction = this.getInstruction(this.get(this.index));
            let opcode = instruction[0];
            switch (opcode) {
                case 1:
                    this.performOperation(this.index, instruction, (a, b) => a + b);
                    this.index += 4;
                    break;
                case 2:
                    this.performOperation(this.index, instruction, (a, b) => a * b);
                    this.index += 4;
                    break;
                case 3:
                    let inputValue = this.getNextInputValue();
                    if (inputValue === null) {
                        this.status = this.StatusEnum.INPUT_PAUSE;
                        return;
                    }
                    this.inputIndex++;
                    this.setResult(instruction[1], this.index + 1, inputValue);
                    this.index += 2;
                    break;
                case 4:
                    this.output = this.getParameter(instruction[1], this.index + 1);
                    this.index += 2;
                    this.status = this.StatusEnum.OUTPUT_PAUSE;
                    return this.output;
                    break;
                case 5:
                    if (this.getParameter(instruction[1], this.index + 1)) {
                        this.index = this.getParameter(instruction[2], this.index + 2);
                    } else {
                        this.index += 3;
                    }
                    break;
                case 6:
                    if (!this.getParameter(instruction[1], this.index + 1)) {
                        this.index = this.getParameter(instruction[2], this.index + 2);
                    } else {
                        this.index += 3;
                    }
                    break;
                case 7:
                    let lessThan =
                        this.getParameter(instruction[1], this.index + 1) <
                        this.getParameter(instruction[2], this.index + 2)
                            ? 1
                            : 0;
                    this.setResult(instruction[3], this.index + 3, lessThan);
                    this.index += 4;
                    break;
                case 8:
                    let equals =
                        this.getParameter(instruction[1], this.index + 1) ===
                        this.getParameter(instruction[2], this.index + 2)
                            ? 1
                            : 0;
                    this.setResult(instruction[3], this.index + 3, equals);
                    this.index += 4;
                    break;
                case 9:
                    this.relativeBase += this.getParameter(instruction[1], this.index + 1);
                    this.index += 2;
                    break;
                case 99:
                    this.status = this.StatusEnum.FINISHED;
                    return;
                default:
                    this.status = this.StatusEnum.ERROR;
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
        return this.get(this.get(pointerIndex));
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
        switch (mode) {
            case 1: //immediate mode
                return this.get(index);
            case 2: //relative mode
                return this.get(this.relativeBase + this.get(index));
            default: //position mode
                return this.getPointed(index);
        }
    }

    setResult(mode, index, value) {
        switch (mode) {
            case 1: //immediate mode
                this.put(value, index);
                break;
            case 2: //relative mode
                this.put(value, this.relativeBase + index);
                break;
            default: //position mode
                this.put(value, this.get(index));
                break;
        }
    }

    performOperation(baseIndex, instruction, operation) {
        let arg1 = this.getParameter(instruction[1], baseIndex + 1);
        let arg2 = this.getParameter(instruction[2], baseIndex + 2);
        let result = operation(arg1, arg2);
        this.setResult(instruction[3], baseIndex + 3, result);
    }

    getNextInputValue() {
        if (this.input.length <= this.inputIndex) {
            return null;
        }
        return this.input[this.inputIndex];
    }

    hasFinishedOperation() {
        return this.status === this.StatusEnum.FINISHED || this.status === this.StatusEnum.ERROR;
    }

    addInput(inputValue) {
        this.input.push(inputValue);
    }

    resumeOperation() {
        return this.runMainLoop();
    }
}
