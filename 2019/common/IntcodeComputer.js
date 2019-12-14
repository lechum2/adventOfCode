export class IntcodeComputer {
    constructor(data) {
        this.data = data;
    }

    compute(input = 0) {
        let output = 0;
        let index = 0;
        let step = 0;
        while (index < this.data.length) {
            let operator = this.data[index];
            let arg1 = this.data[this.data[index + 1]];
            let arg2 = this.data[this.data[index + 2]];
            let result;
            switch (operator) {
                case 1:
                    result = arg1 + arg2;
                    this.data[this.data[index + 3]] = result;
                    step = 4;
                    break;
                case 2:
                    result = arg1 * arg2;
                    this.data[this.data[index + 3]] = result;
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
}
