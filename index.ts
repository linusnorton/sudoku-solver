import * as readline from "readline";
import { GridFactory } from "./src/GridFactory";
import { Solver } from "./src/Solver";

const factory = new GridFactory();
const solver = new Solver();


const lines = readline.createInterface({
  input: process.stdin
});

lines.on("line", line => {
  const grid = factory.create(line);
  const result = solver.solve(grid);

  console.log(result);
});



