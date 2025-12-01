import { readLines } from "../utils/aoc";

const lines = readLines("./day1.txt");

let curr = 50;
let zeroCounter = 0;
let tickCounter = 0;

function iterateLines() {
    for (const line of lines) {
        const dir = line[0];
        let amount = Number(line.slice(1));

        if (dir === "L") amount = -amount;

        p2(amount);

        const next = curr + amount;
        curr = ((next % 100) + 100) % 100;
        if (curr === 0) zeroCounter += 1;
    }
}

function p2(amount: number) {
    const steps = Math.abs(amount);
    const stepDir = amount > 0 ? 1 : -1;

    let firstPass = stepDir === 1 ? (100 - curr) % 100 : curr;
    let passes = 0;

    if (steps > firstPass) {
        passes = 1 + Math.floor((steps - firstPass - 1) / 100);
    }

    tickCounter += passes;
}

iterateLines();
console.log("Ends at 0: ", zeroCounter); // 1135
console.log("Ticks at 0: ", tickCounter); // 6558
