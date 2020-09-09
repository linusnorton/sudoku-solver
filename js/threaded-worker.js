const { parentPort } = require("worker_threads");
const { GridFactory } = require("./src/GridFactory");
const { Solver } = require("./src/Solver");
const factory = new GridFactory();
const solver = new Solver();

parentPort.on("message", row => {
  const grid = factory.create(row);
  const result = solver.solve(grid);
  parentPort.postMessage(result);
});
