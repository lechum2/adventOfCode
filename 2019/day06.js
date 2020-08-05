import { getInput } from "./common/inputReader.js";

class Planet {
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
        this.weight = null;
    }

    getWeight() {
        if(this.weight === null) {
            if (this.parent) {
                this.weight = this.parent.getWeight() + 1;
            } else {
                this.weight = 0;
            }
        }
        return this.weight;
    }
}

let input = getInput("day06.txt");
let planets = new Map();
input.forEach(inputLine => {
    let inputPlanets = inputLine.split(')');
    let parentPlanet;
    let satellitePlanet;
    if (planets.has(inputPlanets[0])) {
        parentPlanet = planets.get(inputPlanets[0]);
    } else {
        parentPlanet = new Planet(inputPlanets[0], null);
        planets.set(inputPlanets[0], parentPlanet);
    }
    if (planets.has(inputPlanets[1])) {
        satellitePlanet = planets.get(inputPlanets[1]);
        satellitePlanet.parent = parentPlanet;
    } else {
        satellitePlanet = new Planet(inputPlanets[1], parentPlanet);
        planets.set(inputPlanets[1], satellitePlanet);
    }
});

let result = [...planets.values()].reduce((accumulator, current) => accumulator + current.getWeight(), 0);

console.log(result);
console.log(planets);