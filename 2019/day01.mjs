import {getInput} from './common/inputReader.mjs';

let data = getInput('day01.txt');
data.unshift(0);

console.log(data.reduce((sum, value) => {
    return sum + Math.floor(value / 3) - 2;
}));