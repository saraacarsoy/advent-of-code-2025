import { readWithDelimiter } from "../utils/aoc";

const intervals = readWithDelimiter("./day2.txt", ",");
let counter = 0;

function iterateintervals() {
    for (const interval of intervals) {
        const limits: string[] = interval.split('-');

        let lowerInterval = limits[0];
        let higherLimit = limits[1];

        for (let i = Number(lowerInterval); i <= Number(higherLimit); i++) {
            if (isInvalidPart2(i)) {
                counter += i;
            }
        }
    }

    console.log(counter)
}

function isInvalidPart1(n: number): boolean {
    const s = String(n);
    const len = s.length;

    if (len % 2 !== 0) return false;

    const half = len / 2;
    const prefix = s.slice(0, half);
    const repeated = prefix + prefix;

    return repeated === s;
}

function isInvalidPart2(n: number): boolean {
    const s = String(n);
    const len = s.length;

    if (len < 2) return false;

    for (let i = 1; i <= Math.floor(len / 2); i++) {
        if (len % i === 0) {
            const prefix = s.slice(0, i);
            
            let repeated = "";
            const numRepeats = len / i;
            
            for (let j = 0; j < numRepeats; j++) {
                repeated += prefix;
            }

            if (repeated === s) {
                return true;
            }
        }
    }

    return false;
}

iterateintervals();
