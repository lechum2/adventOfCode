var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let repeatedValuesMap = new Map;
let boxCodes = [];

lineReader.on('line', function (line) {
    boxCodes.push(line);
    let repeatedLettersMap = new Map;
    for(let i = 0; i < line.length; i++) {
        let value = 0;
        if(repeatedLettersMap.has(line[i])) {
            value  = repeatedLettersMap.get(line[i]);
        }
        repeatedLettersMap.set(line[i], ++value);
    }
    let unique = new Set(repeatedLettersMap.values());
    for(let element of unique) {
        if(element > 1) {
            let value = 0;
            if(repeatedValuesMap.has(element)) {
                value = repeatedValuesMap.get(element);
            }
            repeatedValuesMap.set(element, ++value);
        }
    }
});

lineReader.on("close", function () {
    console.log(repeatedValuesMap);
    let result = 1;
    for(let element of repeatedValuesMap.values()) {
        result *= element;
    }
    console.log(result);

    for(let i = 0; i < boxCodes.length; i++) {
        for(let j = 0; j < boxCodes.length; j++) {
            if(i == j) continue;
            let result = '';
            for(let x = 0; x < boxCodes[j].length; x++) {
                if(boxCodes[i][x] == boxCodes[j][x]) {
                    result += boxCodes[i][x];
                }
            }
            if(result.length == (boxCodes[i].length - 1)) {
                console.log("This is the result: ", result);
                break;
            }
        }
    }
});