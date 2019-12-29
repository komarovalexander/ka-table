import defaultOptions from '../defaultOptions';
import { DataType } from '../enums';
import { Cell } from '../Models/Cell';
import { Column } from '../Models/Column';
import { FilterOperator } from '../Models/FilterOperator';
import { getField } from './ColumnUtils';
import { isEmpty } from './CommonUtils';

export const getRowEditableCells = (rowKeyValue: any, editableCells?: Cell[]): Cell[] => {
  return editableCells ? editableCells.filter((c) => c.rowKey === rowKeyValue) : [];
};

export const searchData = (columns: Column[], data: any[], searchText: string): any[] => {
  return columns.reduce((initialData: any[], c) => {
    const filterFunction = (item: any) => {
      return c.search ? c.search(searchText, item, c) : initialData.indexOf(item) < 0
        && item[getField(c)].toString().toLowerCase().includes(searchText.toLowerCase());
    };
    return initialData.concat(data.filter(filterFunction));
  }, []);
};

export const filterData = (data: any[], columns: Column[]): any[] => {
  return columns.reduce((initialData, column) => {
    if (isEmpty(column.filterRowValue)) { return initialData; }
    const filterRowOperator = column.filterRowOperator
      || getDefaultOperatorForType(column.dataType  || defaultOptions.columnDataType);
    const filterOperator = filterOperators.find((fo) => filterRowOperator === fo.name);
    if (!filterOperator) {
      throw new Error(`'${column.filterRowOperator}' has not found in filter operators array, available operators: ${filterOperators.map((o) => o.name).join(',')}`);
    }
    const compare = filterOperator.compare;
    return initialData.filter((d: any) => compare(d[getField(column)], column.filterRowValue));
  }, data);
};

export const getDefaultOperatorForType = (type: DataType): string => {
  const filterOperator = filterOperators.find((o) => o.defaultForTypes && o.defaultForTypes.includes(type));
  return (filterOperator && filterOperator.name) || '=';
};

const filterOperators: FilterOperator[] = [{
  compare: (fieldValue: any, conditionValue: any): boolean => {
    return fieldValue === conditionValue;
  },
  defaultForTypes: [DataType.Boolean, DataType.Number, DataType.Date],
  name: '=',
}, {
  compare: (fieldValue: any, conditionValue: any): boolean => {
    return fieldValue.toLowerCase().includes(conditionValue.toLowerCase());
  },
  defaultForTypes: [DataType.String],
  name: 'contains',
}];
