import { getInput } from "./common/inputReader.mjs";

let data = getInput("day01.txt");
data.unshift(0);

console.log(
    data.reduce((sum, mass) => {
        let fuel = Math.floor(mass / 3) - 2;
        let sumaryMas = sum;
        while (fuel > 0) {
            sumaryMas += fuel;
            fuel = Math.floor(fuel / 3) - 2;
        }
        return sumaryMas;
    })
);
