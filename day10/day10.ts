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

function stateKey(counters: number[]): string {
    return counters.join(",");
}

function createInitialCounters(count: number): number[] {
    return new Array(count).fill(0);
}

function applyButtonPress(
    current: number[],
    button: number[],
    limits: number[]
): boolean {
    for (const index of button) {
        current[index]++;

        if (current[index] > limits[index]) {

            for (const idx of button) {
                if (idx === index) break;
                current[idx]--;
            }

            return false;
        }
    }

    return true;
}

function undoButtonPress(current: number[], button: number[]) {
    for (const index of button) {
        current[index]--;
    }
}

function minJoltagePresses(machine: Machine): number {
    const targetJoltages = machine.joltages;
    const buttons = machine.buttons;
    const counterCount = targetJoltages.length;

    const startState = createInitialCounters(counterCount);
    const targetKey = stateKey(targetJoltages);

    const queue: Array<{ state: number[]; cost: number }> = [];
    let head = 0;

    const cheapestCostSeen = new Map<string, number>();
    cheapestCostSeen.set(stateKey(startState), 0);

    queue.push({ state: startState.slice(), cost: 0 });

    while (head < queue.length) {
        const { state: currentState, cost: currentCost } = queue[head++];
        const currentKey = stateKey(currentState);

        if (currentKey === targetKey) {
            return currentCost;
        }

        if (currentCost > cheapestCostSeen.get(currentKey)!) {
            continue;
        }

        for (const button of buttons) {
            if (!applyButtonPress(currentState, button, targetJoltages)) continue;

            const nextKey = stateKey(currentState);
            const nextCost = currentCost + 1;

            if (!cheapestCostSeen.has(nextKey) || nextCost < cheapestCostSeen.get(nextKey)!) {
                cheapestCostSeen.set(nextKey, nextCost);
                queue.push({ state: currentState.slice(), cost: nextCost });
            }

            undoButtonPress(currentState, button);
        }
    }
}


function part2() {
    let totalPresses = 0;

    for (const machine of machines) {
        totalPresses += minJoltagePresses(machine);
    }

    console.log(totalPresses);
}

parseInput(input);

// part1();
part2();