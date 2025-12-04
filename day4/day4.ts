import { parseGrid, hasNeighborValue, DIR8 } from "../utils/aoc";

const grid = parseGrid("./day4.txt");
const value = '@';
let counter = 0;
let coords: [number, number][] = [];// keep coords to remove
let total = 0;

function iterateGrid() {
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] == value) {
                checkIfAccesible(r, c);
            }
        }
    }

    if (coords.length === 0) {
        console.log("part 2:", counter);
    } else {
        for (let i = coords.length - 1; i >= 0; i--) {
            const [dr, dc] = coords[i];
            grid[dr][dc] = '.';
            coords.splice(i, 1);
        }
    }
}

function checkIfAccesible(r: number, c: number) {
    let rolls = 0;

    for (const [dr, dc] of DIR8) {
        if (hasNeighborValue(grid, r, c, dr, dc, value)) {
            rolls++;
        }
    }

    if (rolls < 4) {
        counter++;
        coords.push([r, c]);
    }
}

while (true) {
    const before = counter;

    iterateGrid();

    if (counter === before) {
        break;
    }
}
