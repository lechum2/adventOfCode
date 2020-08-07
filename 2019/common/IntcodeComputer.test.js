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

test("should check if input is 8 - position mode", () => {
    let intcode = new IntcodeComputer([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8]);
    expect(intcode.compute(8)).toBe(1);
    intcode.reset();
    expect(intcode.compute(9)).toBe(0);
});

test("should check if input is less than 8 - position mode", () => {
    let intcode = new IntcodeComputer([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8]);
    expect(intcode.compute(7)).toBe(1);
    intcode.reset();
    expect(intcode.compute(9)).toBe(0);
});

test("should check if input is 8 - immediate mode", () => {
    let intcode = new IntcodeComputer([3, 3, 1108, -1, 8, 3, 4, 3, 99]);
    expect(intcode.compute(8)).toBe(1);
    intcode.reset();
    expect(intcode.compute(7)).toBe(0);
});

test("should check if input is less than 8 - immediate mode", () => {
    let intcode = new IntcodeComputer([3, 3, 1107, -1, 8, 3, 4, 3, 99]);
    expect(intcode.compute(7)).toBe(1);
    intcode.reset();
    expect(intcode.compute(500)).toBe(0);
});

test("should check if input is 0 - position mode", () => {
    let intcode = new IntcodeComputer([3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9]);
    expect(intcode.compute(0)).toBe(0);
    intcode.reset();
    expect(intcode.compute(783)).toBe(1);
});

test("should check if input is 0 - immediate mode", () => {
    let intcode = new IntcodeComputer([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1]);
    expect(intcode.compute(0)).toBe(0);
    intcode.reset();
    expect(intcode.compute(12)).toBe(1);
});

test("should compare to 8", () => {
    let intcode = new IntcodeComputer([
        3,
        21,
        1008,
        21,
        8,
        20,
        1005,
        20,
        22,
        107,
        8,
        21,
        20,
        1006,
        20,
        31,
        1106,
        0,
        36,
        98,
        0,
        0,
        1002,
        21,
        125,
        20,
        4,
        20,
        1105,
        1,
        46,
        104,
        999,
        1105,
        1,
        46,
        1101,
        1000,
        1,
        20,
        4,
        20,
        1105,
        1,
        46,
        98,
        99,
    ]);
    expect(intcode.compute(1)).toBe(999);
    intcode.reset();
    expect(intcode.compute(8)).toBe(1000);
    intcode.reset();
    expect(intcode.compute(11)).toBe(1001);
});

test("should take 3 arguments and sum them", () =>{
    let intcode = new IntcodeComputer([3, 0, 3, 1, 3, 2, 1, 0, 1, 0, 1, 2, 0, 0, 4, 0, 99]);
    expect(intcode.compute(2,2,2)).toBe(6);
});
