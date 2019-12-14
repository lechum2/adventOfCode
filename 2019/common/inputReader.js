import fs from "fs";

export function getInput(fileName, separator = "\n", type = String) {
    return fs
        .readFileSync(fileName)
        .toString()
        .split(separator)
        .map(type);
}
