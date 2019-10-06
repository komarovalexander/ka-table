import { Cell } from '../Models/Cell';

export const isEditableCell = (field: string, rowEditableCells?: Cell[]): boolean => {
  return rowEditableCells ? !!rowEditableCells.find((c) => c.field === field) : false;
};
