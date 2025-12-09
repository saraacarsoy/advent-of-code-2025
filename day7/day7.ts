import { parseGrid, findInGrid } from "../utils/aoc";

const grid = parseGrid("./day7.txt");
const start: [number, number] = findInGrid(grid, 'S')!;

let queue: [number, number][] = [];
queue.push(start);

let count = 0;
let visited: [number, number][] = [];

function part1() {
    while (queue.length > 0) {
        const [row, col] = queue.shift()!;

        if (
            row + 1 < grid.length &&
            grid[row + 1][col] === '.' &&
            !visited.some(([r, c]) => r === row + 1 && c === col)
        ) {
            queue.push([row + 1, col]);
            visited.push([row + 1, col]);
        } else if (row + 1 < grid.length && grid[row + 1][col] === '^') {
            count += 1;

            if (
                row + 1 < grid.length &&
                col + 1 < grid[0].length &&
                !visited.some(([r, c]) => r === row + 1 && c === col + 1)
            ) {
                queue.push([row + 1, col + 1]);
                visited.push([row + 1, col + 1]);
            }
            if (
                row + 1 < grid.length &&
                col - 1 >= 0 &&
                !visited.some(([r, c]) => r === row + 1 && c === col - 1)
            ) {
                queue.push([row + 1, col - 1]);
                visited.push([row + 1, col - 1]);
            }
        }
    }
    console.log(count);
}

// part1();


const memo: Record<string, number> = {};

function dfs(row: number, col: number): number {
    const key = String(row) + "," + String(col);
    if (key in memo) return memo[key];

    if (row + 1 < grid.length) {
        if (grid[row + 1][col] === ".") {
            memo[key] = dfs(row + 1, col);
            return memo[key];
        } else {
            memo[key] = dfs(row + 1, col + 1) + dfs(row + 1, col - 1);
            return memo[key];
        }
    } else {
        return 1;
    }
}

function part2() {
    const [startRow, startCol] = start;
    console.log(dfs(startRow, startCol));
}


part2();