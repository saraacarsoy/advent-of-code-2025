import { readLines } from "../utils/aoc";

const lines = readLines("./day3.txt");

let counter = 0;

function iterateLines() {
    for (const line of lines) {
        // getMaxTwoDigits(line);
        removeSmallest(line);
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

function removeSmallest(s: string) {
    const digits = s.length;
    let toRemove = digits - 12;

    const stack: string[] = [];
    const arr: string[] = s.split('');

    arr.forEach(el => {
        while (toRemove > 0 && stack.length > 0 && stack[stack.length - 1] < el) {
            stack.pop();
            toRemove--;
        }
        stack.push(el);
    });

    const remaining: string = stack.slice(0, 12).join('');
    counter +=  Number(remaining);
}

iterateLines();
console.log(counter);