"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solver = void 0;
class Solver {
    solve(grid) {
        this.eliminate(grid);
        if (grid.numRemaining > 0) {
            this.infer(grid);
        }
        return grid.id + "," + grid.cells.map(arr => arr[0]).join("");
    }
    eliminate(grid) {
        let keepTrying = true;
        while (grid.numRemaining > 0 && keepTrying) {
            keepTrying = false;
            for (let i = 0; i < grid.cells.length; i++) {
                if (grid.cells[i].length > 1) {
                    const previousNum = grid.cells[i].length;
                    grid.cells[i] = grid.cells[i].filter(num => grid.cellCanBe(i, num));
                    const numCompleted = previousNum - grid.cells[i].length;
                    grid.numRemaining -= grid.cells.length === 1 ? 1 : 0;
                    keepTrying = keepTrying || numCompleted > 0;
                }
            }
        }
    }
    infer(grid) {
        let extraFound = 0;
        for (let i = 0; i < grid.cells.length; i++) {
            for (const num of grid.cells[i]) {
                if (grid.cells[i].length > 1 && grid.cellHasToBe(i, num)) {
                    grid.cells[i] = [num];
                    extraFound++;
                    break;
                }
            }
        }
        grid.numRemaining -= extraFound;
        if (extraFound > 0 && grid.numRemaining > 0) {
            this.solve(grid);
        }
    }
}
exports.Solver = Solver;
