import { Intcode } from "./../common/IntcodeComputer.mjs";

describe("Intcode Computer Unit Test", () => {
    it("should return input as output", () => {
        let intcode = new Intcode([3, 0, 4, 0, 99]);
        let result = intcode.compute(313);
        expect(result).toBe(313);
    });
});
