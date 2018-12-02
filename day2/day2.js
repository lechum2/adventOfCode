var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let repeatedValuesMap = new Map;

lineReader.on('line', function (line) {
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
});