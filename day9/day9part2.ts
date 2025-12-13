import { readLines } from "../utils/aoc";

interface Point {
    x: number;
    y: number;
}

const points: Point[] = readLines("./day9.txt").map(line => {
    const [x, y] = line.split(",").map(Number);
    return { x, y };
});

const segments: [Point, Point][] = [];
for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    segments.push([a, b]);
}

function collides(rect: { x1: number; y1: number; x2: number; y2: number; a: Point; b: Point }): boolean {
    for (const [p1, p2] of segments) {
        if (p1 === rect.a || p1 === rect.b || p2 === rect.a || p2 === rect.b) continue;

        const segRect = {
            x1: Math.min(p1.x, p2.x),
            y1: Math.min(p1.y, p2.y),
            x2: Math.max(p1.x, p2.x),
            y2: Math.max(p1.y, p2.y),
        };

        if (!(rect.x2 <= segRect.x1 ||
            rect.x1 >= segRect.x2 ||
            rect.y2 <= segRect.y1 ||
            rect.y1 >= segRect.y2)) {
            return true;
        }

    }
    return false;
}

let best = 0;
for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
        const a = points[i];
        const b = points[j];

        if (a.x === b.x || a.y === b.y) continue;

        const rect = {
            x1: Math.min(a.x, b.x),
            y1: Math.min(a.y, b.y),
            x2: Math.max(a.x, b.x),
            y2: Math.max(a.y, b.y),
            a,
            b
        };

        if (!collides(rect)) {
            const area = (rect.x2 - rect.x1 + 1) * (rect.y2 - rect.y1 + 1);
            best = Math.max(best, area);
        }
    }
}

console.log(best);