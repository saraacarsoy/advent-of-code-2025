import { readLines } from "../utils/aoc";

type PresentIndex = number;

interface Presents {
    index: PresentIndex;
    size: number; // amount of #
    grid: string[][];
    // location of each individual # ?
}

interface Regions {
    width: number;
    length: number;
    size: number;
    requests: Map<PresentIndex, number>;
}

const presents: Presents[] = [];
const regions: Regions[] = [];

function parseInput(lines: string[]) {
    let i = 0;

    while (i < lines.length) {
        const line = lines[i].trim();

        if (line === "") {
            i++;
            continue;
        }

        const presentId = line.match(/^(\d+):$/);
        if (presentId) {
            const index: PresentIndex = Number(presentId[1]);
            const grid = [
                lines[i + 1].split(''),
                lines[i + 2].split(''),
                lines[i + 3].split(''),
            ];
            const size = grid.flat().filter(ch => ch === "#").length;

            presents.push({ index, size, grid });

            i += 4;
            continue;
        }

        const regionsRegex = line.match(/^(\d+)x(\d+):\s*(.*)$/);
        if (regionsRegex) {
            const width = Number(regionsRegex[1]);
            const length = Number(regionsRegex[2]);
            const size = width * length;
            const requests: Map<PresentIndex, number> = new Map<PresentIndex, number>();

            const values = regionsRegex[3].split(/\s+/).map(Number);

            for (let i = 0; i < values.length; i++) {
                requests.set(i, values[i])
            }

            regions.push({ width, length, size, requests });
            i++;
            continue;
        }
    }

    return { presents, regions };
}

const input = readLines("./day12.txt");
parseInput(input);

function checkIfAllFits() {
    let count = 0;
    for (let i = 0; i < regions.length; i++) {
        const maxSize = regions[i].size;
        let totalPresentSize = 0;

        for (let [presentIdx, amount] of regions[i].requests) {
            totalPresentSize += presents[presentIdx].size * amount;
        }

        if (maxSize < totalPresentSize) continue;
        count++;
    }

    console.log(count);

}

checkIfAllFits();