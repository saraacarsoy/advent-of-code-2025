import { readLines } from "../utils/aoc";

const lines = readLines("./day3.txt");

let counter = 0;

function iterateLines() {
    for (const line of lines) {
        getMaxTwoDigits(line);
    }
}

function getMaxTwoDigits(s: string) {
    let best = 0;

    for (let i = 0; i < s.length; i++) {
        for (let j = i + 1; j < s.length; j++) {
            const num = parseInt(s[i] + s[j])
            if (num > best) {
                best = num;
            }
        }
    }

    counter += best;
}

iterateLines();
console.log(counter);