import * as readline from "readline";
import { Worker } from "worker_threads";

// const numCPUs = require("os").cpus().length;
const numCPUs = 8;

const lines = readline.createInterface({
  input: process.stdin
});

let puzzles = [] as string[];
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

      if (!more && puzzles.length === 0) {
        worker.terminate();
      }
      else {
        worker.postMessage(puzzles.pop());
      }
    });

    worker.postMessage(puzzles.pop());
  }

}
