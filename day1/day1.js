var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

var result = 0;
var inputValues = [];

lineReader.on('line', function (line) {
    inputValues.push(line);
    if(line[0] == '-') {
        result -= Number(line.substring(1));
    } else if (line[0] == '+') {
        result += Number(line.substring(1));
    }
});

lineReader.on("close", function () {
    console.log(inputValues);
    console.log(result);
    var values = [];
    currentValue = 0;
    var repeat = true;
    while(repeat) {
        inputValues.forEach(function (element) {
            if(element[0] == '-') {
                currentValue -= Number(element.substring(1));
            } else if (element[0] == '+') {
                currentValue += Number(element.substring(1));
            }
            if(values.includes(currentValue)) {
                console.log("first repeated value: ", currentValue);
                repeat = false;
            }
            values.push(currentValue);
        });
    }
});