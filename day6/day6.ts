import { readLines } from "../utils/aoc";

const lines: string[] = readLines("./day6.txt");

function formatInput() {
    const updated = lines.map(line =>
        line.split(' ').filter(x => x !== '')
    );

    return updated;
}

const input = formatInput();

const signs: string[] = input.at(-1);

let  totalCounter = 0;

for (let col = 0; col < input[0].length; col++) {
    let operator = signs[col];
    let count = operator === "+" ? 0 : 1;

    for (let row = 0; row < input.length - 1; row++) {
        if (operator === "+") {
            count += Number(input[row][col]);
        } else {
            count *= Number(input[row][col]);
        }
    }

    totalCounter += count;
}

console.log(totalCounter)
