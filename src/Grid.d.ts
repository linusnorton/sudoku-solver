export declare class Grid {
    readonly id: string;
    readonly cells: string[][];
    readonly remainingIndex: Record<string, number>;
    numRemaining: number;
    constructor(id: string, cells: string[][], remainingIndex: Record<string, number>, numRemaining: number);
    cellCanBe(i: number, num: string): boolean;
    private rowContains;
    private colContains;
    private boxContains;
    cellHasToBe(i: number, num: string): boolean;
    private cellInRowCanBe;
    private cellInColCanBe;
    private cellInBoxCanBe;
}
