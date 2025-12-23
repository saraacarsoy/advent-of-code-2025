import { readLines } from "../utils/aoc";

const input = readLines("./day10.txt");

type Machine = {
    target: boolean[];
    buttons: number[][];
    joltages: number[];
};

const machines: Machine[] = [];

function parseInput(lines: string[]) {

    for (const line of lines) {
        const indicatorMatch = line.match(/\[([.#]+)\]/);

        const target = [...indicatorMatch[1]].map(c => c === "#");

        const buttonMatches = [...line.matchAll(/\(([^)]+)\)/g)];
        const buttons = buttonMatches.map(m =>
            m[1].split(",").map(n => Number(n))
        );

        const joltageMatch = line.match(/\{([^}]+)\}/)!;
        const joltages = joltageMatch[1]
            .split(",")
            .map(n => Number(n));

        machines.push({ target, buttons, joltages });
    }
}

function part2() {
    let totalPresses = 0;

    for (const machine of machines) {
        
    }

    console.log(totalPresses);
}

parseInput(input);

part2();