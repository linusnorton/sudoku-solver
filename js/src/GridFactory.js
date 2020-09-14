
const { Grid } = require("./Grid");

class GridFactory {
  create(row) {
    const [id, values] = row.split(",");
    const cells = [];
    let numAnswered = 0;
    for (let i = 0; i < values.length; i++) {
      if (values[i] !== "0") {
        numAnswered++;
        cells.push([values[i]]);
      }
      else {
        cells.push(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
      }
    }
    return new Grid(id, cells, cells.length - numAnswered);
  }
}
exports.GridFactory = GridFactory;
