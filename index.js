"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const GridFactory_1 = require("./src/GridFactory");
const Solver_1 = require("./src/Solver");
const factory = new GridFactory_1.GridFactory();
const solver = new Solver_1.Solver();
const lines = readline.createInterface({
    input: process.stdin
});
lines.on("line", line => {
    const grid = factory.create(line);
    const result = solver.solve(grid);
    console.log(result);
});
