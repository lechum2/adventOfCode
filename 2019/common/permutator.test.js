import { permutator } from "./permutator.js";
import { TestScheduler } from "jest";

test("should return all permutations of small array", () => {
    expect(permutator([1, 2])).toStrictEqual([
        [1, 2],
        [2, 1],
    ]);
});

test("should return all premutations of bigger array", () => {
    expect(permutator([1, 2, 3])).toStrictEqual([
        [1, 2, 3],
        [1, 3, 2],
        [2, 1, 3],
        [2, 3, 1],
        [3, 1, 2],
        [3, 2, 1],
    ]);
});
