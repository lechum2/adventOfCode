export class IntcodeComputer {
    constructor(data) {
        this.data = data;
    }

    compute(input = 0) {
        let output = 0;
        let index = 0;
        while (index < this.data.length) {
            let operator = this.data[index];
            let arg1 = this.data[this.data[index + 1]];
            let arg2 = this.data[this.data[index + 2]];
            let result;
            switch (operator) {
                case 1:
                    result = arg1 + arg2;
                    break;
                case 2:
                    result = arg1 * arg2;
                    break;
                case 3:
                    this.put(input, this.get(index + 1));
                    break;
                case 4:
                    output = this.get(index + 1);
                case 99:
                    return;
                default:
                    console.error("Unknown operator!");
                    return;
            }
            this.data[this.data[index + 3]] = result;
            index += 4;
        }
        return output;
    }

    put(value, index) {
        this.data[index] = value;
    }

    get(index) {
        return this.data[index];
    }
}
