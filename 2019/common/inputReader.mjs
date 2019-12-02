import fs from 'fs';

export function getInput(fileName, separator = '\n') {
    return fs.readFileSync(fileName).toString().split(separator);
}
