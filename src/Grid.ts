
export class Grid {
  constructor(
    public readonly id: string,
    public readonly cells: string[][],
    public readonly remainingIndex: Record<string, number>,
    public numRemaining: number
  ) { }

  public cellCanBe(i: number, num: string): boolean {
    return !this.rowContains(i, num) && !this.colContains(i, num) && !this.boxContains(i, num);
  }

  private rowContains(cell: number, num: string): boolean {
    const row = Math.floor(cell / 9);
    const start = row * 9;

    for (let i = start; i <  start + 9; i++) {
      // check not i
      if (this.cells[i].length === 1 && this.cells[i][0] === num) {
        return true;
      }
    }

    return false;
  }

  private colContains(cell: number, num: string): boolean {
    const col = cell % 9;

    for (let i = col; i < this.cells.length; i += 9) {
      if (this.cells[i].length === 1 && this.cells[i][0] === num) {
        return true;
      }
    }

    return false;
  }

  private boxContains(cell: number, num: string): boolean {
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

  public cellHasToBe(i: number, num: string): boolean {
    return !this.cellInRowCanBe(i, num) || !this.cellInColCanBe(i, num) || !this.cellInBoxCanBe(i, num);
  }


  private cellInRowCanBe(cell: number, num: string): boolean {
    const row = Math.floor(cell / 9);
    const start = row * 9;

    for (let i = start; i <  start + 9; i++) {
      if (cell !== i && this.cells[i].includes(num)) {
        return true;
      }
    }

    return false;
  }

  private cellInColCanBe(cell: number, num: string): boolean {
    const col = cell % 9;

    for (let i = col; i < this.cells.length; i += 9) {
      if (cell !== i && this.cells[i].includes(num)) {
        return true;
      }
    }

    return false;
  }

  private cellInBoxCanBe(cell: number, num: string): boolean {
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
