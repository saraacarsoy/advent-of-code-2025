import { readInput } from "../utils/aoc";

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

const graph = parseLines(input);

for (const [device, outputs] of Object.entries(graph)) {
    console.log(device, outputs)
}

const next = graph["you"] ?? [];
console.log(next)