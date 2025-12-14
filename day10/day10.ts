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

// X Y X^Y
// 0 0  0
// 0 1  1
// 1 0  1
// 1 1  0

function buildButtonMask(indices: number[]): number {
    let mask = 0;

    for (const i of indices) {
        mask ^= (1 << i);
    }

    return mask;
}

function minPresses(machine: Machine): number {
    const { target, buttons } = machine;
    const n = target.length;

    let targetMask = 0;
    for (let i = 0; i < n; i++) {
        if (target[i]) targetMask |= (1 << i);
    }

    const buttonMasks = buttons.map(buildButtonMask);

    const queue: number[] = [0]; // start with all lights off
    const dist = new Map<number, number>();
    dist.set(0, 0);

    while (queue.length > 0) {
        const state = queue.shift()!;
        const d = dist.get(state)!;

        if (state === targetMask) {
            return d;
        }

        for (const bm of buttonMasks) {
            const next = state ^ bm;

            if (!dist.has(next)) {
                dist.set(next, d + 1);
                queue.push(next);
            }
        }
    }
}


function part1() {
    let totalPresses = 0;

    for (const machine of machines) {
        totalPresses += minPresses(machine);
    }

    console.log(totalPresses);
}

parseInput(input);

part1();