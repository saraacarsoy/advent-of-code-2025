import { readLines } from "../utils/aoc";

type Machine = {
    buttons: number[][];
    joltages: number[];
};

const input = readLines("./day10.txt");
const machines: Machine[] = [];

function parseInput(lines: string[]) {
    for (const line of lines) {
        const buttonMatches = [...line.matchAll(/\(([^)]+)\)/g)];
        const buttons = buttonMatches.map(m =>
            m[1].split(",").map(n => Number(n))
        );

        const joltageMatch = line.match(/\{([^}]+)\}/);
        if (!joltageMatch) continue;

        const joltages = joltageMatch[1]
            .split(",")
            .map(n => Number(n));

        machines.push({ buttons, joltages });
    }
}

function calculatePresses(buttons: number[][], target: number[]): number {
    const rows = target.length;
    const cols = buttons.length;

    const A = Array.from({ length: rows }, () => Array(cols).fill(0));
    for (let j = 0; j < cols; j++) {
        for (const i of buttons[j]) {
            A[i][j] = 1;
        }
    }

    const b = [...target];

    let r = 0;
    const pivotCol: number[] = [];
    const colToRow = new Map<number, number>();

    for (let c = 0; c < cols && r < rows; c++) {
        let sel = r;
        while (sel < rows && A[sel][c] === 0) sel++;
        if (sel === rows) continue;

        [A[r], A[sel]] = [A[sel], A[r]];
        [b[r], b[sel]] = [b[sel], b[r]];

        const div = A[r][c];
        for (let j = c; j < cols; j++) A[r][j] /= div;
        b[r] /= div;

        for (let i = 0; i < rows; i++) {
            if (i !== r && A[i][c] !== 0) {
                const f = A[i][c];
                for (let j = c; j < cols; j++) {
                    A[i][j] -= f * A[r][j];
                }
                b[i] -= f * b[r];
            }
        }

        pivotCol.push(c);
        colToRow.set(c, r);
        r++;
    }

    for (let i = r; i < rows; i++) {
        if (Math.abs(b[i]) > 1e-9) return Infinity;
    }

    const pivots = new Set(pivotCol);
    const free: number[] = [];
    for (let c = 0; c < cols; c++) {
        if (!pivots.has(c)) free.push(c);
    }

    const bounds = buttons.map(btn =>
        Math.max(...btn.map(i => target[i]))
    );

    let best = Infinity;
    const x = Array(cols).fill(0);

    function dfs(idx: number, cost: number) {
        if (cost >= best) return;

        if (idx === free.length) {
            let total = cost;

            for (let i = pivotCol.length - 1; i >= 0; i--) {
                const c = pivotCol[i];
                const row = colToRow.get(c)!;

                let val = b[row];
                for (let j = c + 1; j < cols; j++) {
                    val -= A[row][j] * x[j];
                }

                if (Math.abs(val - Math.round(val)) > 1e-9) return;
                val = Math.round(val);

                if (val < 0 || val > bounds[c]) return;

                x[c] = val;
                total += val;
                if (total >= best) return;
            }

            best = total;
            return;
        }

        const c = free[idx];
        for (let v = 0; v <= bounds[c]; v++) {
            x[c] = v;
            dfs(idx + 1, cost + v);
        }
    }

    dfs(0, 0);
    return best;
}

function part2() {
    parseInput(input);

    let totalPresses = 0;
    for (const machine of machines) {
        totalPresses += calculatePresses(machine.buttons, machine.joltages);
    }

    console.log(totalPresses);
}

part2();
