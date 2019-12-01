import fs from 'fs';

export function getInput(fileName) {
    return fs.readFileSync(fileName).toString().split('\n');
}