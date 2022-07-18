import { getInput } from "./common/httpInputReader.js";

class LanternfishModel {
    constructor(lanternfishArray) {
        this.lanternfishArray = lanternfishArray;
    }
    calculateDay() {
        let previousDayArray = this.lanternfishArray;
        this.lanternfishArray = new Array();
        for (let i = 0; i < previousDayArray.length; i++) {
            if (previousDayArray[i] === 0) {
                this.lanternfishArray.push(8);
                this.lanternfishArray.push(6);
            } else {
                this.lanternfishArray.push(--previousDayArray[i]);
            }
        }
    }
    calculateDays(daysNumber) {
        for (let i = 0; i < daysNumber; i++) {
            this.calculateDay();
        }
    }
    count() {
        return this.lanternfishArray.length;
    }
}

let data = await getInput(2021, 6, ",", Number);
let model = new LanternfishModel(data);
model.calculateDays(80);
console.log(model.count());