import { readWithDelimiter } from "../utils/aoc";

const intervals = readWithDelimiter("./day2.txt", ",");
let counter = 0;

function iterateintervals() {
    for (const interval of intervals) {
        const limits: string[] = interval.split('-');

        let lowerInterval = limits[0];
        let higherLimit = limits[1];

        checkRepetition(lowerInterval, Number(higherLimit))
    }
}

function checkRepetition(lowerLimit: string, higherLimit: number) {
    const digits = lowerLimit.length;
    const repetitiveDigits = Math.ceil(digits / 2);

    if (digits % 2 !== 0) {
        lowerLimit = rollToHigherEvenDigitCount(lowerLimit);
    }

    let low = Number(lowerLimit);
    const high = Number(higherLimit);

    const half = lowerLimit.slice(0, repetitiveDigits);
    const halfAsInt = Number(half);

    for (let i = halfAsInt; i < Number(rollToHigherEvenDigitCount(half)); i++) {
        checkInterval(low, high, i.toString());
    }
}

function checkInterval(lower: number, higher: number, n: string) {
    let duplicate = Number(n + n);

    if (lower <= duplicate && higher >= duplicate) {
        counter += duplicate;
    }
}

function rollToHigherEvenDigitCount(n: string): string {
    const digits = n.length;
    return "1" + "0".repeat(digits);
}

function getDivisorsOfDigit(num: string): number[] {
    const digits = num.length;
    const half = digits / 2;

    const divisors: number[] = [1];

    for (let i = 2; i < half; i++) {
        if (digits % i === 0 && i !== half) {
            divisors.push(i);
        }
    }

    return divisors;
}


iterateintervals();
console.log(counter)