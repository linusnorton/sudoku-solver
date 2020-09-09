const readline = require("readline");
const { GridFactory } = require("./src/GridFactory");
const { Solver } = require("./src/Solver");
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
