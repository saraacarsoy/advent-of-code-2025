import { readLines, splitByBlank } from "../utils/aoc";

const lines = readLines("./day5.txt");
let counter = 0;

interface Interval {
    lower: number;
    upper: number;
}

let intervals: Interval[] = [];
let nums: number[] = [];

function formatInput() {
    const input = splitByBlank(lines);

    nums = input[1].map(el => Number(el));

    intervals = input[0].map(el => {
        const [lower, upper] = el.split('-').map(Number);
        return { lower, upper };
    });

    /* part 1
    nums.forEach(num => {
        if(isInAnyInterval(num)) counter += 1
    });
    */

    sortIntervals();
}

function isInAnyInterval(n: number): boolean {
    return intervals.some(int => n >= int.lower && n <= int.upper);
}

function sortIntervals() {
    const sorted = intervals.sort((a, b) => a.lower - b.lower);

    const arr: Interval[] = [];
    let last = null;

    for (const interval of sorted) {
        if (!last) {
            arr.push(interval);
            last = interval;
            continue;
        }

        if (interval.lower <= last.upper) {
            last.upper = Math.max(last.upper, interval.upper);
        } else {
            arr.push(interval);
            last = interval;
        }
    }

    countInclusive(arr);
}

function shouldUpdate(current: Interval, interval: Interval) {
    return current.lower > interval.lower || current.upper < interval.upper;
}

function countInclusive(intervals: Interval[]) {
    let total = 0;

    for (const interval of intervals) {
        total += interval.upper - interval.lower + 1;
    }

    console.log(total)
}


formatInput();

