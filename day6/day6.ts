import { readLines } from "../utils/aoc";

const lines = readLines("./day6.txt");
const input = lines.map(line =>
    line.split(" ").filter(x => x !== "")
);
const signs = input.at(-1) as string[];

function part1(): number {
    let total = 0;

    for (let col = 0; col < input[0].length; col++) {
        const operator = signs[col];
        let acc = operator === "+" ? 0 : 1;

        for (let row = 0; row < input.length - 1; row++) {
            const value = Number(input[row][col]);
            acc = operator === "+" ? acc + value : acc * value;
        }

        total += acc;
    }

    return total;
}

console.log(part1());