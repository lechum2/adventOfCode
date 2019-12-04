
function isMatchingConditions(digits) {
    let matching = false;
    for(let i = 0; i < digits.length - 1; i++) {
        if(digits[i] > digits[i + 1]) {
            return false;
        }
        if(!matching && digits[i] === digits[i + 1]) {
            matching = true;
        }
    }
    return matching;
}

function countMatchingNumbers(from, to) {
    let counter = 0;
    for(let i = from; i <= to; i++) {
        let digits = i.toString().split('').map(Number);
        if(isMatchingConditions(digits)) {
            counter++;
        }
    }
    return counter;
}

const inputFrom = 136760;
const inputTo = 595730;
console.log(countMatchingNumbers(inputFrom, inputTo));