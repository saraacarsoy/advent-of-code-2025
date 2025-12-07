import { count } from "node:console";
import { readLines } from "../utils/aoc";

const lines = readLines("./day6.txt");
const input = lines.map(line =>
    line.split(" ").filter(x => x !== "")
);
const signs = input.at(-1) as string[];
lines.pop()

function part1(): number {
    let total = 0;

    for (let col = 0; col < input[0].length; col++) {
        const operator = signs[col];
        let acc = operator === "+" ? 0 : 1;

        for (let row = 0; row < input.length - 1; row++) {
            const value = Number(input[row][col]);
            acc = operator === "+" ? acc + value : acc * value;
        }

        total += acc;
    }

    return total;
}

function readColumns(rows: string[]) {
    const height = rows.length;
    const width = rows[0].length;
    const cols = [];

    for (let c = 0; c < width; c++) {
        let col = "";
        for (let r = 0; r < height; r++) {
            col += rows[r][c];
        }
        cols.push(col);
    }
    return cols;
}

function groupByEmpty(columns: string[]): string[][] {
    const groups: string[][] = [];
    let current: string[] = [];

    for (const col of columns) {
        if (isEmpty(col)) {
            if (current.length > 0) {
                groups.push(current);
                current = [];
            }
        } else {
            current.push(col);
        }
    }

    if (current.length > 0) { // the last col
        groups.push(current);
    }

    return groups;
}


function isEmpty(col: string): boolean {
    return col.trim() === "";
}

const cols = readColumns(lines);
const grouped = groupByEmpty(cols);

function part2() {
    let total = 0;
    for (let i = 0; i < grouped.length; i++) {
        const operator: string = signs[i];
        let acc = operator === "+" ? 0 : 1;

        for (let num of grouped[i]) {
            const val = Number(num.trim());

            acc = operator === "+" ? acc + val : acc * val;
        }

        total += acc;
    }
    console.log(total)
}

part2();
// console.log(part1());