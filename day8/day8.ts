import { readLines } from "../utils/aoc";

const grid: Point[] = readLines("./day8.txt")
    .map(line => {
        const [x, y, z] = line.split(',').map(Number);
        return { x, y, z };
    });

const solvePart1 = true;

interface Point {
    x: number;
    y: number;
    z: number;
}

interface Edge {
    u: number;
    v: number;
    weight: number;
}

class UnionFind {
    parent: number[];
    size: number[];

    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.size = Array(n).fill(1);
    }

    find(u: number): number {
        if (this.parent[u] !== u) {
            this.parent[u] = this.find(this.parent[u]);
        }
        return this.parent[u];
    }

    union(u: number, v: number): boolean {
        const rootU = this.find(u);
        const rootV = this.find(v);
        if (rootU === rootV) return false;

        if (this.size[rootU] < this.size[rootV]) {
            this.parent[rootU] = rootV;
            this.size[rootV] += this.size[rootU];
        } else {
            this.parent[rootV] = rootU;
            this.size[rootU] += this.size[rootV];
        }
        return true;
    }
}

function buildEdges(): Edge[] {
    const edges: Edge[] = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = i + 1; j < grid.length; j++) {
            edges.push({ u: i, v: j, weight: distance(grid[i], grid[j]) });
        }
    }

    return edges;
}

function distance(a: Point, b: Point): number {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dz = a.z - b.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function part1() {
    const n = grid.length;
    const uf = new UnionFind(n);
    const edges = buildEdges();

    edges.sort((a, b) => a.weight - b.weight);

    if (solvePart1) {
        const targetPairs = 1000;
        for (let i = 0; i < targetPairs; i++) {
            const edge = edges[i];
            uf.union(edge.u, edge.v);
        }

        const circuitSizes = new Map<number, number>();
        for (let i = 0; i < n; i++) {
            const root = uf.find(i);
            circuitSizes.set(root, (circuitSizes.get(root) ?? 0) + 1);
        }

        const sizes = [...circuitSizes.values()].sort((a, b) => b - a);
        const productOfThreeLargest = sizes[0] * sizes[1] * sizes[2];

        console.log(productOfThreeLargest);
    }


}

part1();