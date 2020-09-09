"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const GridFactory_1 = require("./src/GridFactory");
const Solver_1 = require("./src/Solver");
const factory = new GridFactory_1.GridFactory();
const solver = new Solver_1.Solver();
worker_threads_1.parentPort?.on("message", row => {
    const grid = factory.create(row);
    const result = solver.solve(grid);
    worker_threads_1.parentPort?.postMessage(result);
});
