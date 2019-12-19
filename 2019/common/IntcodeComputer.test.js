import { IntcodeComputer } from "./IntcodeComputer.js";

test("should return input as output", () => {
    let intcode = new IntcodeComputer([3, 0, 4, 0, 99]);
    let result = intcode.compute(313);
    expect(result).toBe(313);
});

test("should properly add and multiply", () => {
    let intcode = new IntcodeComputer([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]);
    intcode.compute();
    let result = intcode.get(0);
    expect(result).toBe(3500);
});

test("should handle paramter mode", () => {
    let intcode = new IntcodeComputer([1002, 4, 3, 4, 33]);
    intcode.compute();
    let result = intcode.get(4);
    expect(result).toBe(99);
});

test("should check if input is 8", () => {
    let intcode = new IntcodeComputer([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8]);
    expect(intcode.compute(8)).toBe(1);
    expect(intcode.compute(9)).toBe(0);
});
