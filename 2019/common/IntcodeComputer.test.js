import { IntcodeComputer } from "./IntcodeComputer.js";

test("should return input as output", () => {
    let intcode = new IntcodeComputer([3, 0, 4, 0, 99]);
    let result = intcode.compute(313);
    expect(result).toBe(313);
});

test("should properly add and multiply", () => {
    let intcode = new IntcodeComputer([1,9,10,3,2,3,11,0,99,30,40,50]);
    intcode.compute();
    let result = intcode.get(0);
    expect(result).toBe(3500);
});