
function create(row) {
  const cells = [];
  let numAnswered = 0;
  for (let i = 1; i < values.length; i++) {
    if (values[i] !== 0) {
      numAnswered++;
      cells.push([values[i]]);
    }
    else {
      cells.push([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }
  }
  return { id, cells, numRemaining: cells.length - numAnswered };
}

function cellCanBe(grid, i, num) {
  return !rowContains(grid, i, num) && !colContains(grid, i, num) && !boxContains(grid, i, num);
}

function rowContains(grid, cell, num) {
  const row = Math.floor(cell / 9);
  const start = row * 9;
  for (let i = start; i < start + 9; i++) {
    if (grid.cells[i].length === 1 && grid.cells[i][0] === num) {
      return true;
    }
  }
  return false;
}

function colContains(grid, cell, num) {
  const col = cell % 9;
  for (let i = col; i < grid.cells.length; i += 9) {
    if (grid.cells[i].length === 1 && grid.cells[i][0] === num) {
      return true;
    }
  }
  return false;
}

function boxContains(grid, cell, num) {
  const cellX = cell % 3;
  const cellY = Math.floor(cell / 9) % 3;
  for (let y = 0; y < 3; y++) {
    const rowOffset = (y - cellY) * 9;
    for (let x = 0; x < 3; x++) {
      const colOffset = x - cellX;
      const i = cell + rowOffset + colOffset;
      if (grid.cells[i].length === 1 && grid.cells[i][0] === num) {
        return true;
      }
    }
  }
  return false;
}

function cellHasToBe(grid, i, num) {
  return !cellInRowCanBe(grid, i, num) || !cellInColCanBe(grid, i, num) || !cellInBoxCanBe(grid, i, num);
}

function cellInRowCanBe(grid, cell, num) {
  const row = Math.floor(cell / 9);
  const start = row * 9;
  for (let i = start; i < start + 9; i++) {
    if (cell !== i && grid.cells[i].includes(num)) {
      return true;
    }
  }
  return false;
}

function cellInColCanBe(grid, cell, num) {
  const col = cell % 9;
  for (let i = col; i < grid.cells.length; i += 9) {
    if (cell !== i && grid.cells[i].includes(num)) {
      return true;
    }
  }
  return false;
}

function cellInBoxCanBe(grid, cell, num) {
  const cellX = cell % 3;
  const cellY = Math.floor(cell / 9) % 3;
  for (let y = 0; y < 3; y++) {
    const rowOffset = (y - cellY) * 9;
    for (let x = 0; x < 3; x++) {
      const colOffset = x - cellX;
      const i = cell + rowOffset + colOffset;
      if (cell !== i && grid.cells[i].includes(num)) {
        return true;
      }
    }
  }
  return false;
}

function solve(grid) {
  eliminate(grid);
  if (grid.numRemaining > 0) {
    infer(grid);
  }
  return grid.id + "," + grid.cells.map(arr => arr[0]).join("");
}

function eliminate(grid) {
  let keepTrying = true;
  while (grid.numRemaining > 0 && keepTrying) {
    keepTrying = false;
    for (let i = 0; i < grid.cells.length; i++) {
      if (grid.cells[i].length > 1) {
        const previousNum = grid.cells[i].length;
        grid.cells[i] = grid.cells[i].filter(num => cellCanBe(grid, i, num));
        const numCompleted = previousNum - grid.cells[i].length;
        grid.numRemaining -= grid.cells.length === 1 ? 1 : 0;
        keepTrying = keepTrying || numCompleted > 0;
      }
    }
  }
}

function infer(grid) {
  let extraFound = 0;
  for (let i = 0; i < grid.cells.length; i++) {
    for (const num of grid.cells[i]) {
      if (grid.cells[i].length > 1 && cellHasToBe(grid, i, num)) {
        grid.cells[i] = [num];
        extraFound++;
        break;
      }
    }
  }
  grid.numRemaining -= extraFound;
  if (extraFound > 0 && grid.numRemaining > 0) {
    solve(grid);
  }
}

const { GPU } = require('gpu.js');
const gpu = new GPU();

gpu.addFunction(create);
gpu.addFunction(cellCanBe);
gpu.addFunction(rowContains);
gpu.addFunction(colContains);
gpu.addFunction(boxContains);
gpu.addFunction(cellHasToBe);
gpu.addFunction(cellInRowCanBe);
gpu.addFunction(cellInColCanBe);
gpu.addFunction(cellInBoxCanBe);
gpu.addFunction(solve);
gpu.addFunction(eliminate);
gpu.addFunction(infer);

const sudoku = gpu.createKernel(function(a, b) {
  const results = [];

  for (let i = 0; i < 100000; i++) {
    const grid = create(this.thread.x);
    const solution = solve(grid);
    const result = grid.cells.unshift(grid.id);
    results.push(results);
  }
  return sum;
}).setOutput([100000, 82]);

const c = sudoku([[1,0,0,4,3,0,0,2,0,9,0,0,5,0,0,9,0,0,1,0,7,0,0,6,0,0,4,3,0,0,6,0,0,2,0,8,7,1,9,0,0,0,7,4,0,0,0,5,0,0,8,3,0,0,0,6,0,0,0,0,0,1,0,5,0,0,3,5,0,8,6,9,0,0,4,2,9,1,0,3,0,0]]);

console.log(c);
