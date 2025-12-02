import { readWithDelimiter } from "../utils/aoc";

const intervals = readWithDelimiter("./day2.txt", ",");
let counter = 0;

function iterateintervals() {
    for (const interval of intervals) {
        const limits: string[] = interval.split('-');

        if (shouldCheck(limits[0], limits[1])) {
            let lowerInterval = limits[0];
            let higherLimit = limits[1];

            // no need to check equality as input is safe for 10 = 10 or 99 = 99
            if (limits[0].length % 2 !== 0) {
                const evenDigit = rollToHigherEvenDigitCount(lowerInterval);
                if (Number(evenDigit) < Number(limits[1])) {
                    lowerInterval = evenDigit;
                }
            }
            if (limits[1].length % 2 !== 0) {
                const evenDigit = rollToLowerEvenDigitCount(higherLimit);
                if (Number(evenDigit) > Number(limits[0])) {
                    higherLimit = evenDigit;
                }
            }

            checkRepetition(lowerInterval, Number(higherLimit))
        }
    }
}

function checkRepetition(lowerLimit: string, higherLimit: number) {
    const digits = lowerLimit.length;
    const repetitiveDigits = digits / 2;

    const low = Number(lowerLimit);
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

function shouldCheck(lower: string, higher: string): boolean {
    // if both lower and higher interval same digit and it is an odd number, skip
    const digits = lower.length;

    if (digits === higher.length && digits % 2 !== 0) {
        return false;
    }

    return true;
}

function rollToHigherEvenDigitCount(n: string): string {
    const digits = n.length;
    return "1" + "0".repeat(digits);
}

function rollToLowerEvenDigitCount(n: string): string {
    const digits = n.length;
    return "9".repeat(digits - 1);
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