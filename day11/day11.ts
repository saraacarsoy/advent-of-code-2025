import { memo, readInput } from "../utils/aoc";

const input = readInput("./day11.txt");

type Graph = Record<string, string[]>;

function parseLines(input: string): Graph {
    const lines = input.trim().split(/\r?\n/);
    const graph: Graph = {};

    for (const line of lines) {
        if (!line.trim()) continue;

        const [left, right] = line.split(":");
        const src = left.trim();

        const targets = right.trim() === ""
            ? []
            : right.trim().split(/\s+/);

        graph[src] = targets;
    }

    return graph;
}

let memoization: Record<string, number> = {};

function dfs(device: string, path: string[], hasFft: boolean, hasDac: boolean): number {
    const key = `${device}-${hasFft ? 1 : 0}-${hasDac ? 1 : 0}`;
    if (key in memoization) return memoization[key];
    if (path.includes(device)) return 0;

    const currentHasFft = hasFft || device === "fft";
    const currentHasDac = hasDac || device === "dac";

    if (device === "out") {
        const result = (currentHasFft && currentHasDac) ? 1 : 0;
        memoization[key] = result;
        return result;
    }

    const next = graph[device] || [];

    path.push(device);

    let total = 0;
    for (let i = 0; i < next.length; i++) {
        total += dfs(next[i], path, currentHasFft, currentHasDac);
    }

    path.pop();
    memoization[key] = total;
    return total;
}

const graph = parseLines(input);

const totalPaths = dfs("svr", [], false, false);

console.log("part 1:", totalPaths);