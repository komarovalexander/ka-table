import { Cell } from '../Models/Cell';
import { FilterRowItem } from '../Models/FilterRowItem';
import { OptionChangedFunc } from '../Types/OptionChangedFunc';
import { getCopyOfArrayAndDeleteItem, getCopyOfArrayAndInsertOrReplaceItem } from './ArrayUtils';
import { isEmpty } from './CommonUtils';

export const getRowEditableCells = (rowKeyValue: any, editableCells?: Cell[]): Cell[] => {
  return editableCells ? editableCells.filter((c) => c.rowKeyValue === rowKeyValue) : [];
};

export const filterData = (data: any[], filterRow: FilterRowItem[]) => {
  return filterRow.reduce((initialData, f) => {
    const searcFunc = typeof f.value === 'string' ? (d: any) => d[f.field].toLowerCase().includes(f.value.toLowerCase())
      : (d: any) => d[f.field] === f.value;
    return initialData.filter(searcFunc);
  }, data);
};

export const filterCellValueChangeHandler = (
    value: any, field: string, filterRow: FilterRowItem[], optionChangeHandler: OptionChangedFunc,
  ) => {
  let newFilterRow;
  const newFRValue: FilterRowItem = {
    field,
    operator: '=',
    value,
  };
  newFilterRow = isEmpty(value) ? getCopyOfArrayAndDeleteItem(newFRValue, 'field', filterRow)
    : getCopyOfArrayAndInsertOrReplaceItem(newFRValue, 'field', filterRow);
  optionChangeHandler({ filterRow: newFilterRow });
};
