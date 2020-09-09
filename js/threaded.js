
const readline = require("readline");
const { Worker } = require("worker_threads");
// const numCPUs = require("os").cpus().length;
const numCPUs = 8;
const lines = readline.createInterface({
  input: process.stdin
});

let puzzles = [];
let started = false;

lines.on("line", line => {
  puzzles.push(line);
  if (!started && puzzles.length === numCPUs) {
    started = true;
    console.error("starting");
    start();
  }
});

let more = true;
lines.on("close", () => {
  more = false;
});

function start() {
  for (let i = 0; i < numCPUs - 1; i++) {
    const worker = new Worker(__dirname + "/threaded-worker.js");
    worker.on("message", message => {
      console.log(message);
      getMore(worker);
    });
    worker.postMessage(puzzles.pop());
  }
}

function getMore(worker) {
  if (puzzles.length === 0) {
    if (!more) {
      worker.terminate();
    }
    else {
      setTimeout(() => getMore(worker), 50);
    }
  }
  else {
    worker.postMessage(puzzles.pop());
  }
}
