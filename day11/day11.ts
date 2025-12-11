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

const countPaths = memo(function dfs(device: string): number {
    if (device === "out") return 1;

    const next = graph[device] || [];
    if (next.length === 0) return 0;

    let total = 0;
    for (const child of next) {
        total += dfs(child);
    }
    return total;
});

const graph = parseLines(input);
const totalPaths = countPaths("you");

console.log("part 1:", totalPaths);