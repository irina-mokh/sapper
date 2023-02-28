export type ICell = { val: number | string, open: boolean };
export type IBoard = Array<Array<ICell>>;
export type IPosition = { row: number | null, col: number | null };
