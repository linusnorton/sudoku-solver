
const { Grid } = require("./Grid");

class GridFactory {
  create(row) {
    const [id, values] = row.split(",");
    const cells = [];
    const remainingIndex = { "1": 9, "2": 9, "3": 9, "4": 9, "5": 9, "6": 9, "7": 9, "8": 9, "9": 9 };
    const allValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let numAnswered = 0;
    for (let i = 0; i < values.length; i++) {
      if (values[i] !== "0") {
        numAnswered++;
        remainingIndex[values[i]]--;
        cells.push([values[i]]);
      }
      else {
        cells.push([...allValues]);
      }
    }
    return new Grid(id, cells, remainingIndex, cells.length - numAnswered);
  }
}
exports.GridFactory = GridFactory;
