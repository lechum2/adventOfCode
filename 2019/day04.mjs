function thereAreTwoRepeated(digits) {
    let foundDouble = false;
    let repeatedValue = undefined;
    for (let i = 0; i < digits.length - 1; i++) {
        if (digits[i] === digits[i + 1]) {
            if (digits[i] === repeatedValue) {
                foundDouble = false;
            } else {
                foundDouble = true;
                repeatedValue = digits[i];
            }
        } else if (foundDouble) {
            return true;
        } else {
            repeatedValue = undefined;
        }
    }
    return foundDouble;
}

function digitsDontDecrease(digits) {
    for (let i = 0; i < digits.length - 1; i++) {
        if (digits[i] > digits[i + 1]) {
            return false;
        }
    }
    return true;
}

function countMatchingNumbers(from, to) {
    let counter = 0;
    for (let i = from; i <= to; i++) {
        let digits = i
            .toString()
            .split("")
            .map(Number);
        if (digitsDontDecrease(digits) && thereAreTwoRepeated(digits)) {
            counter++;
        }
    }
    return counter;
}

const inputFrom = 136760;
const inputTo = 595730;
console.log(countMatchingNumbers(inputFrom, inputTo));
