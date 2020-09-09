import * as chai from "chai";
import { GridFactory } from "./GridFactory";
import { Solver } from "./Solver";

describe("Solver", () => {
  const factory = new GridFactory();
  const solver = new Solver();

  it("solves", () => {
    const grid = factory.create("1,027090004000000710000104003290006070300520900648000100014807200800950060056300091");
    const result = solver.solve(grid);

    chai.expect(result).to.deep.equal("1,127693584463285719589174623295416378371528946648739152914867235832951467756342891");
  });

  it("solves2", () => {
    const grid = factory.create("1,068700900004000071031809050305080100046005007007304092602001005003020600059030028");
    const result = solver.solve(grid);

    chai.expect(result).to.deep.equal("1,568712943924653871731849256395287164246195387817364592682971435473528619159436728");
  });
});
