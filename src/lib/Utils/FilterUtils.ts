import { Cell } from '../Models/Cell';
import { Column } from '../Models/Column';
import { FilterCondition } from '../Models/FilterCondition';
import { OptionChangedFunc } from '../types';
import { getCopyOfArrayAndDeleteItem, getCopyOfArrayAndInsertOrReplaceItem } from './ArrayUtils';
import { isEmpty } from './CommonUtils';

export const getRowEditableCells = (rowKeyValue: any, editableCells?: Cell[]): Cell[] => {
  return editableCells ? editableCells.filter((c) => c.rowKeyValue === rowKeyValue) : [];
};

export const searchData = (columns: Column[], data: any[], searchText: string): any[] => {
  return columns.reduce((initialData: any[], c) => {
    const filterFunction = (item: any) => {
      return c.search ? c.search(searchText, item, c) : initialData.indexOf(item) < 0
        && item[c.field].toString().toLowerCase().includes(searchText.toLowerCase());
    };
    return initialData.concat(data.filter(filterFunction));
  }, []);
};

export const filterData = (data: any[], filterRow: FilterCondition[]): any[] => {
  return filterRow.reduce((initialData, f) => {
    const searcFunc = typeof f.value === 'string' ? (d: any) => d[f.field].toLowerCase().includes(f.value.toLowerCase())
      : (d: any) => d[f.field] === f.value;
    return initialData.filter(searcFunc);
  }, data);
};

export const filterCellValueChangeHandler = (
    value: any, field: string, filterRow: FilterCondition[], optionChangeHandler: OptionChangedFunc,
  ) => {
  let newFilterRow;
  const newFRValue: FilterCondition = {
    field,
    operator: '=',
    value,
  };
  newFilterRow = isEmpty(value) ? getCopyOfArrayAndDeleteItem(newFRValue, 'field', filterRow)
    : getCopyOfArrayAndInsertOrReplaceItem(newFRValue, 'field', filterRow);
  optionChangeHandler({ filterRow: newFilterRow });
};
