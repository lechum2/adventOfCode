var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

var value = 0;

lineReader.on('line', function (line) {
    if(line[0] == '-') {
        value -= Number(line.substring(1));
    } else if (line[0] == '+') {
        value += Number(line.substring(1));
    }
    console.log('line was: ', line);
    console.log('current sum is: ', value);
});