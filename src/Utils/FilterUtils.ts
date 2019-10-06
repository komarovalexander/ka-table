import { Cell } from '../Models/Cell';

export const getRowEditableCells = (rowKeyValue: any, editableCells?: Cell[]): Cell[] => {
  return editableCells ? editableCells.filter((c) => c.rowKeyValue === rowKeyValue) : [];
};
