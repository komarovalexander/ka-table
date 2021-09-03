import { ITableProps } from '../';
import defaultOptions from '../defaultOptions';
import { DataType, FilterOperatorName } from '../enums';
import { Column } from '../Models/Column';
import { EditableCell } from '../Models/EditableCell';
import { FilterOperator } from '../Models/FilterOperator';
import { FilterFunc, SearchFunc, FormatFunc } from '../types';
import { isEmpty } from './CommonUtils';
import { getValueByColumn } from './DataUtils';
import { convertToColumnTypes } from './TypeUtils';

export const getRowEditableCells = (rowKeyValue: any, editableCells: EditableCell[]): EditableCell[] => {
  return editableCells.filter((c) => c.rowKeyValue === rowKeyValue);
};

export const searchData = (columns: Column[], data: any[], searchText: string, search?: SearchFunc): any[] => {
  const searched = columns.reduce((initialData: any[], c: Column) => {
    const filterFunction = (item: any) => {
      if (initialData.indexOf(item) >= 0) {
        return false;
      }
      const searchContent = search && search({ column: c, searchText, rowData: item });
      if (searchContent != null) {
        return searchContent;
      }
      const columnValue = getValueByColumn(item, c);
      if (columnValue == null) {
        return false;
      }
      return columnValue.toString().toLowerCase().includes(searchText.toLowerCase());
    };
    return initialData.concat(data.filter(filterFunction));
  }, []);
  return data.filter(d => searched.indexOf(d) >= 0);
};

export const filterAndSearchData = (props: ITableProps) => {
  const {
    extendedFilter,
    searchText,
    columns,
    search,
    filter,
    format
  } = props;
  let {
    data = [],
  } = props;
  data = [...data];
  data = extendedFilter ? extendedFilter(data) : data;
  data = searchText ? searchData(columns, data, searchText, search) : data;
  data = convertToColumnTypes(data, columns);
  data = filterData(data, columns, filter);
  data = filterByHeaderFilter(data, columns, format);

  return data;
};

const getCompare = (column: Column) => {
  const filterRowOperator = column.filterRowOperator
    || getDefaultOperatorForType(column.dataType || defaultOptions.columnDataType);
  const filterOperator = predefinedFilterOperators.find((fo) => filterRowOperator === fo.name);
  if (!filterOperator) {
    throw new Error(`'${column.filterRowOperator}' has not found in predefinedFilterOperators array, available operators: ${predefinedFilterOperators.map((o) => o.name).join(', ')}`);
  }
  return filterOperator.compare;
};

export const filterData = (data: any[], columns: Column[], filter?: FilterFunc): any[] => {
  return columns.reduce((initialData, column) => {
    if (
      isEmpty(column.filterRowValue)
      && column.filterRowOperator !== FilterOperatorName.IsEmpty
      && column.filterRowOperator !== FilterOperatorName.IsNotEmpty
    ) {
      return initialData;
    }
    const compare = filter?.({ column }) || getCompare(column);
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

export const filterByHeaderFilter = (data: any[], columns: Column[], format?: FormatFunc): any[] => {
  return columns.reduce((initialData, column) => {
    if (
      isEmpty(column.headerFilterValues)
      && column.filterRowOperator !== FilterOperatorName.IsEmpty
      && column.filterRowOperator !== FilterOperatorName.IsNotEmpty
    ) {
      return initialData;
    }
    return initialData.filter((item: any) => {
      let value: any = getValueByColumn(item, column);
      const fieldValue =
        (format && format({ column, value }))
        || value?.toString();
      return column.headerFilterValues?.includes(fieldValue);
    });
  }, data);
}

