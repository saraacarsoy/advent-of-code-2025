import { readFileSync } from 'node:fs';

// lines as string
export function readInput(path: string): string {
  return readFileSync(path, 'utf8');
}

// read lines as array with delimiter
export function readWithDelimiter(path: string, delimiter: string): string[] {
  return readFileSync(path, 'utf8').split(delimiter);
}

// lines as array
export function readLines(path: string): string[] {
  return readFileSync(path, 'utf8').replace(/\r/g, '').split('\n');
}

// split each row char by char
export function parseGrid(path: string): string[][] {
  return readLines(path).map(line => line.split(''));
}

export const DIR4: [number, number][] = [ [1,0], [-1,0], [0,1], [0,-1] ];
export const DIR8: [number, number][] = [ [1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1] ];

export function inBounds(r: number, c: number, R: number, C: number): boolean {
  return r >= 0 && c >= 0 && r < R && c < C;
}

export function cloneGrid<T>(g: T[][]): T[][] {
  return g.map(row => [...row]);
}

// get first occurence of ch in 2d array
export function findInGrid(g: string[][], ch: string): [number, number] | null {
  const R = g.length, C = g[0].length;
  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++)
      if (g[r][c] === ch) return [r, c];
  return null;
}

// get numbers from string
export function numbers(s: string): number[] {
  return [...s.matchAll(/-?\d+/g)].map(m => Number(m[0]));
}

// split array in to groups by blank lines
export function splitByBlank(lines: string[]): string[][] {
  const groups: string[][] = [];
  let cur: string[] = [];
  for (const line of lines) {
    if (line.trim() === '') { groups.push(cur); cur = []; }
    else cur.push(line);
  }
  if (cur.length) groups.push(cur);
  return groups;
}

export function memo<T, U>(fn: (arg: T) => U): (arg: T) => U {
  const cache = new Map<T, U>();
  return function(k: T) {
    if (cache.has(k)) return cache.get(k)!;
    const v = fn(k);
    cache.set(k, v);
    return v;
  };
}

export function range(a: number, b: number): number[] {
  const res: number[] = [];
  for (let i = a; i <= b; i++) res.push(i);
  return res;
}

// non negative integer
export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export function hasNeighborValue(
  grid: string[][],
  r: number,
  c: number,
  dr: number,
  dc: number,
  value: string
): boolean {
  const nr = r + dr;
  const nc = c + dc;
  if (nr < 0 || nc < 0 || nr >= grid.length || nc >= grid[0].length) {
    return false;
  }
  return grid[nr][nc] === value;
}

export function anyNeighborIs(
  grid: string[][],
  r: number,
  c: number,
  value: string
): boolean {
  const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
  for (const [dr, dc] of dirs) {
    const nr = r + dr, nc = c + dc;
    if (nr < 0 || nc < 0 || nr >= grid.length || nc >= grid[0].length) {
      continue;
    }
    if (grid[nr][nc] === value) return true;
  }
  return false;
}
