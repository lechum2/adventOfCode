import {getInput} from './common/inputReader.mjs';
import {compute} from './common/IntcodeComputer.mjs';

function findInputsForValue(data, value) {
    for(let i=0; i<100; i++) {
        for(let j=0; j<100; j++) {
            let iterationData = [...data];
            iterationData[1] = i;
            iterationData[2] = j;
            compute(iterationData);
            if(iterationData[0] === value) {
                return 100 * i + j;
            }
        }
    }
}

let input = getInput('day02.txt', ',', Number);
let data = [...input];
data[1] = 12;
data[2] = 2;
compute(data);
console.log(data[0]);

//var nounAndVerb = findInputsForValue(input, 19690720);
//console.log(nounAndVerb);

