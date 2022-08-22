import { getInput } from "./common/httpInputReader.js";

class LanternfishModel {
    constructor(lanternfishArray) {
        this.lanternfishArray = lanternfishArray;
        this.count = 0;
    }
    calculateDay() {
        let previousDayArray = this.lanternfishArray;
        this.lanternfishArray = new Array();
        while (previousDayArray.length > 0) {
            let value = previousDayArray.pop();
            if (value === 0) {
                this.lanternfishArray.push(8);
                this.lanternfishArray.push(6);
            } else {
                this.lanternfishArray.push(--value);
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
    calculateSpawnedFromOne(startingNumber, days) {
        if (startingNumber >= days) return 0;
        let count = 0;
        let leftDays = days - startingNumber - 1;
        while (leftDays >= 0) {
            count++;
            count += this.calculateSpawnedFromOne(8, leftDays);
            leftDays -= 7;
        }
        return count;
    }
    countAfterDays(days) {
        let count = 0;
        for (let i = 0; i < this.lanternfishArray.length; i++) {
            count++;
            count += this.calculateSpawnedFromOne(this.lanternfishArray[i], days);
            console.debug(`${i+1}/${this.lanternfishArray.length}`);
        }
        return count;
    }
}

let data = await getInput(2021, 6, ",", Number);
let model = new LanternfishModel(data);
console.log(model.countAfterDays(256));