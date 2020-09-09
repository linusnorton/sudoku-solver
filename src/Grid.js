"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
class Grid {
    constructor(id, cells, remainingIndex, numRemaining) {
        this.id = id;
        this.cells = cells;
        this.remainingIndex = remainingIndex;
        this.numRemaining = numRemaining;
    }
    cellCanBe(i, num) {
        return !this.rowContains(i, num) && !this.colContains(i, num) && !this.boxContains(i, num);
    }
    rowContains(cell, num) {
        const row = Math.floor(cell / 9);
        const start = row * 9;
        for (let i = start; i < start + 9; i++) {
            // check not i
            if (this.cells[i].length === 1 && this.cells[i][0] === num) {
                return true;
            }
        }
        return false;
    }
    colContains(cell, num) {
        const col = cell % 9;
        for (let i = col; i < this.cells.length; i += 9) {
            if (this.cells[i].length === 1 && this.cells[i][0] === num) {
                return true;
            }
        }
        return false;
    }
    boxContains(cell, num) {
        const cellX = cell % 3;
        const cellY = Math.floor(cell / 9) % 3;
        for (let y = 0; y < 3; y++) {
            const rowOffset = (y - cellY) * 9;
            for (let x = 0; x < 3; x++) {
                const colOffset = x - cellX;
                const i = cell + rowOffset + colOffset;
                if (i !== cell && this.cells[i].length === 1 && this.cells[i][0] === num) {
                    return true;
                }
            }
        }
        return false;
    }
    cellHasToBe(i, num) {
        return !this.cellInRowCanBe(i, num) || !this.cellInColCanBe(i, num) || !this.cellInBoxCanBe(i, num);
    }
    cellInRowCanBe(cell, num) {
        const row = Math.floor(cell / 9);
        const start = row * 9;
        for (let i = start; i < start + 9; i++) {
            if (cell !== i && this.cells[i].includes(num)) {
                return true;
            }
        }
        return false;
    }
    cellInColCanBe(cell, num) {
        const col = cell % 9;
        for (let i = col; i < this.cells.length; i += 9) {
            if (cell !== i && this.cells[i].includes(num)) {
                return true;
            }
        }
        return false;
    }
    cellInBoxCanBe(cell, num) {
        const cellX = cell % 3;
        const cellY = Math.floor(cell / 9) % 3;
        for (let y = 0; y < 3; y++) {
            const rowOffset = (y - cellY) * 9;
            for (let x = 0; x < 3; x++) {
                const colOffset = x - cellX;
                const i = cell + rowOffset + colOffset;
                if (cell !== i && this.cells[i].includes(num)) {
                    return true;
                }
            }
        }
        return false;
    }
}
exports.Grid = Grid;
