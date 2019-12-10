export function compute(data) {
    let index = 0;
    while (index < data.length) {
        let operator = data[index];
        let arg1 = data[data[index + 1]];
        let arg2 = data[data[index + 2]];
        let result;
        switch (operator) {
            case 1:
                result = arg1 + arg2;
                break;
            case 2:
                result = arg1 * arg2;
                break;
            case 99:
                return;
            default: console.error('Unknown operator!');
                return;
        }
        data[data[index + 3]] = result;
        index += 4;
    }
}
