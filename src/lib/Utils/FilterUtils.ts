import defaultOptions from '../defaultOptions';
import { DataType, FilterOperatorName } from '../enums';
import { Cell } from '../Models/Cell';
import { Column } from '../Models/Column';
import { FilterOperator } from '../Models/FilterOperator';
import { isEmpty } from './CommonUtils';
import { getValueByColumn } from './DataUtils';

export const getRowEditableCells = (rowKeyValue: any, editableCells: Cell[]): Cell[] => {
  return editableCells.filter((c) => c.rowKeyValue === rowKeyValue);
};

export const searchData = (columns: Column[], data: any[], searchText: string): any[] => {
  return columns.reduce((initialData: any[], c: Column) => {
    const filterFunction = (item: any) => {
      if (c.search) {
        return c.search(searchText, item, c);
      }
      if (initialData.indexOf(item) >= 0) {
        return false;
      }
      const columnValue = getValueByColumn(item, c);
      if (columnValue == null) {
        return false;
      }
      return columnValue.toString().toLowerCase().includes(searchText.toLowerCase());
    };
    return initialData.concat(data.filter(filterFunction));
  }, []);
};

export const filterData = (data: any[], columns: Column[]): any[] => {
  return columns.reduce((initialData, column) => {
    if (
      isEmpty(column.filterRowValue)
      && column.filterRowOperator !== FilterOperatorName.IsEmpty
      && column.filterRowOperator !== FilterOperatorName.IsNotEmpty
    ) {
      return initialData;
    }
    const filterRowOperator = column.filterRowOperator
      || getDefaultOperatorForType(column.dataType  || defaultOptions.columnDataType);
    const filterOperator = predefinedFilterOperators.find((fo) => filterRowOperator === fo.name);
    if (!filterOperator) {
      throw new Error(`'${column.filterRowOperator}' has not found in predefinedFilterOperators array, available operators: ${predefinedFilterOperators.map((o) => o.name).join(', ')}`);
    }
    const compare = filterOperator.compare;
    return initialData.filter((d: any) => {
      let fieldValue = getValueByColumn(d, column);
      let conditionValue = column.filterRowValue;
      if (column.dataType === DataType.Date) {
        fieldValue = fieldValue == null ? fieldValue : new Date(fieldValue).setHours(0, 0, 0, 0);
        conditionValue = conditionValue == null ? conditionValue : new Date(conditionValue).setHours(0, 0, 0, 0);
      }
      return compare(fieldValue, conditionValue);
    });
  }, data);
};

export const getDefaultOperatorForType = (type: DataType): string => {
  const filterOperator = predefinedFilterOperators.find((o) => o.defaultForTypes && o.defaultForTypes.includes(type));
  return (filterOperator && filterOperator.name) || '=';
};

export const predefinedFilterOperators: FilterOperator[] = [{
  compare: (fieldValue: any, conditionValue: any) =>
    fieldValue === conditionValue,
  defaultForTypes: [DataType.Boolean, DataType.Number, DataType.Date],
  name: FilterOperatorName.Equal,
}, {
  compare: (fieldValue: any, conditionValue: any) =>
    fieldValue > conditionValue,
  name: FilterOperatorName.MoreThan,
}, {
  compare: (fieldValue: any, conditionValue: any) =>
    fieldValue < conditionValue,
  name: FilterOperatorName.LessThan,
}, {
  compare: (fieldValue: any, conditionValue: any) =>
    fieldValue >= conditionValue,
  name: FilterOperatorName.MoreThanOrEqual,
}, {
  compare: (fieldValue: any, conditionValue: any) =>
    fieldValue <= conditionValue,
  name: FilterOperatorName.LessThanOrEqual,
}, {
  compare: (fieldValue: any, conditionValue: any) =>
    fieldValue != null && fieldValue.toString().toLowerCase().includes(conditionValue.toString().toLowerCase()),
  defaultForTypes: [DataType.String],
  name: FilterOperatorName.Contains,
}, {
  compare: (fieldValue: any) =>
    isEmpty(fieldValue),
  name: FilterOperatorName.IsEmpty,
}, {
  compare: (fieldValue: any) =>
    !isEmpty(fieldValue),
  name: FilterOperatorName.IsNotEmpty,
}];
