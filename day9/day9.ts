import { parseGrid, readLines } from "../utils/aoc";

interface Point {
    x: number;
    y: number;
}

const grid: Point[] = readLines("./day9.txt")
    .map(line => {
        const [x, y] = line.split(',').map(Number);
        return { x, y };
    });

const arr: number[] = [];
function iterateGrid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = i + 1; j < grid.length; j++) {
            const area = calculateArea(grid[i], grid[j]);
            arr.push(area);
        }
    }

    return Math.max(...arr);
}

function calculateArea(x: Point, y: Point) {
    return (Math.abs(x.x - y.x) + 1) * (Math.abs(x.y - y.y) + 1);
}

console.log(iterateGrid());