import { readLines } from "../utils/aoc";

const lines = readLines("./day1.txt");

let curr = 50;  
let zeroCounter = 0;

function iterateLines() {
  	for (const line of lines) {
			const dir = line[0];
			let amount = Number(line.slice(1));

			if (dir === "L") amount = -amount;
			
			curr = (curr + amount) % 100;

			if (curr == 0) {
				zeroCounter += 1;
			}
    }
}

iterateLines();
console.log("Ends at 0: ", zeroCounter);