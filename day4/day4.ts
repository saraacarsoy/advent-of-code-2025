import { parseGrid, hasNeighborValue, DIR8 } from "../utils/aoc";

const grid = parseGrid("./day4.txt");

function iterateGrid() {
    let counter = 0;
    const value = '@';

    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] == value) {
                let rolls = 0;

                for (const [dr, dc] of DIR8) {
                    if (hasNeighborValue(grid, r, c, dr, dc, value)) {
                        rolls++;
                    }
                }

                if (rolls < 4) counter++;
            }

        }
    }
    console.log(counter);
}

iterateGrid();