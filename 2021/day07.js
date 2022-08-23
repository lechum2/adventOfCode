import { getInput } from "../2019/common/inputReader.js";

function getMinFuel(input) {
    console.log(input);
    let topValue = Math.max(...input);
    console.log(topValue);
    let fuel = 100000000000;
    for(let i = 0; i <= topValue; i++) {
        let currentFuel = 0;
        for(const value of input) {
            currentFuel += Math.abs(value - i);
        }
        if (currentFuel < fuel) {
            fuel = currentFuel;
        }
        console.log(fuel);
    }
}

let data = getInput("day07.txt", ",", Number);
getMinFuel(data);