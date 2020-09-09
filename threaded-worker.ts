import { parentPort, workerData } from "worker_threads";
import { GridFactory } from "./src/GridFactory";
import { Solver } from "./src/Solver";

const factory = new GridFactory();
const solver = new Solver();

parentPort?.on("message", row => {
  const grid = factory.create(row);
  const result = solver.solve(grid);

  parentPort?.postMessage(result);
})
