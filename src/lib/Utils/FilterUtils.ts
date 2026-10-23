import { DataType, FilterOperatorName } from '../enums';
import { FilterFunc, FormatFunc, SearchFunc } from '../types';

import { Column } from '../Models/Column';
import { EditableCell } from '../Models/EditableCell';
import { FilterOperator } from '../Models/FilterOperator';
import { ITableProps } from '../';
import defaultOptions from '../defaultOptions';
import { getDate } from './DateUtils';
import { getFormattedValue, getValueByColumn, isFormattedValue } from './DataUtils';
import { isEmpty } from './CommonUtils';

export const getRowEditableCells = (rowKeyValue: unknown, editableCells: EditableCell[]): EditableCell[] => {
    return editableCells.filter((c) => c.rowKeyValue === rowKeyValue);
};

/**
 * The rows which show the text: the formatted values are searched by their text, the hidden columns only by the search function
 */
export const searchData = <TData>(columns: Column[], data: TData[], searchText: string, search?: SearchFunc<TData>, format?: FormatFunc<TData>): TData[] => {
    const lowerCaseSearchText = searchText.toLowerCase();
    // a set instead of searching in the found rows for every row of every column
    const found = new Set<TData>();
    columns.forEach((c: Column) => {
        data.forEach((item) => {
            if (found.has(item)) {
                return;
            }
            const searchContent = search && search({ column: c, searchText, rowData: item });
            if (searchContent != null) {
                if (searchContent) {
                    found.add(item);
                }
                return;
            }
            if (c.visible === false) {
                return;
            }
            const columnValue = getValueByColumn(item, c);
            const formattedValue = format?.({ column: c, value: columnValue, rowData: item });
            // the value which format doesn't format or formats not as a text (e.g. as an element) is searched by itself
            const text = isFormattedValue(formattedValue) && typeof formattedValue !== 'object' ? formattedValue : columnValue;
            if (text != null && text.toString().toLowerCase().includes(lowerCaseSearchText)) {
                found.add(item);
            }
        });
    });
    return data.filter(d => found.has(d));
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
    data = searchText ? searchData(columns, data, searchText, search, format) : data;
    data = filterData(data, columns, filter);
    data = filterByHeaderFilter(data, columns, format);

    return data;
};

// an unknown operator is reported once: the data is filtered again on every change
const reportedUnknownOperators = new Set<string>();

const getCompare = (column: Column) => {
    const filterRowOperator = column.filterRowOperator
        || getDefaultOperatorForType(column.dataType || defaultOptions.columnDataType);
    const filterOperator = predefinedFilterOperators.find((fo) => filterRowOperator === fo.name);
    if (!filterOperator && !reportedUnknownOperators.has(filterRowOperator)) {
        // the column is not filtered instead of an error during rendering, which removes the whole table
        reportedUnknownOperators.add(filterRowOperator);
        console.warn(`ka-table: the filter operator '${filterRowOperator}' is not in predefinedFilterOperators, so the column '${column.key}' is not filtered. Available operators: ${predefinedFilterOperators.map((o) => o.name).join(', ')}`);
    }
    return filterOperator?.compare;
};

// IsEmpty and IsNotEmpty filter the rows without a value of the filter
export const isFilterOperatorWithoutValue = (filterRowOperator?: string) => (
    filterRowOperator === FilterOperatorName.IsEmpty || filterRowOperator === FilterOperatorName.IsNotEmpty
);

export const isFilteredByFilterRow = (column: Column) => !isEmpty(column.filterRowValue) || isFilterOperatorWithoutValue(column.filterRowOperator);

export const filterData = <TData>(data: TData[], columns: Column[], filter?: FilterFunc<TData>): TData[] => {
    return columns.reduce((initialData, column) => {
        if (!isFilteredByFilterRow(column)) {
            return initialData;
        }
        const customFilter = column.filter || filter?.({ column });
        const compare = customFilter || getCompare(column);
        if (!compare) {
            return initialData;
        }

        return initialData.filter((d) => {
            let fieldValue = getValueByColumn(d, column);
            let conditionValue = column.filterRowValue;
            if (column.dataType === DataType.Date && !customFilter) {
                fieldValue = fieldValue == null ? fieldValue : getDate(fieldValue).setHours(0, 0, 0, 0);
                conditionValue = conditionValue == null ? conditionValue : getDate(conditionValue).setHours(0, 0, 0, 0);
            }
            return compare(fieldValue, conditionValue, d);
        });
    }, data);
};

export const getDefaultOperatorForType = (type: DataType): string => {
    const filterOperator = predefinedFilterOperators.find((o) => o.defaultForTypes && o.defaultForTypes.includes(type));
    return (filterOperator && filterOperator.name) || '=';
};

export const predefinedFilterOperators: FilterOperator[] = [{
    compare: (fieldValue, conditionValue) =>
        fieldValue === conditionValue,
    defaultForTypes: [DataType.Boolean, DataType.Number, DataType.Date],
    name: FilterOperatorName.Equal,
}, {
    compare: (fieldValue, conditionValue) =>
        fieldValue !== conditionValue,
    name: FilterOperatorName.IsNotEqual,
}, {
    compare: (fieldValue, conditionValue) =>
        fieldValue > conditionValue,
    name: FilterOperatorName.MoreThan,
}, {
    compare: (fieldValue, conditionValue) =>
        fieldValue < conditionValue,
    name: FilterOperatorName.LessThan,
}, {
    compare: (fieldValue, conditionValue) =>
        fieldValue >= conditionValue,
    name: FilterOperatorName.MoreThanOrEqual,
}, {
    compare: (fieldValue, conditionValue) =>
        fieldValue <= conditionValue,
    name: FilterOperatorName.LessThanOrEqual,
}, {
    compare: (fieldValue, conditionValue) =>
        fieldValue != null && fieldValue.toString().toLowerCase().includes(conditionValue.toString().toLowerCase()),
    defaultForTypes: [DataType.String],
    name: FilterOperatorName.Contains,
}, {
    compare: (fieldValue) =>
        isEmpty(fieldValue),
    name: FilterOperatorName.IsEmpty,
}, {
    compare: (fieldValue) =>
        !isEmpty(fieldValue),
    name: FilterOperatorName.IsNotEmpty,
}];

export const filterByHeaderFilter = <TData>(data: TData[], columns: Column[], format?: FormatFunc<TData>): TData[] => {
    return columns.reduce((initialData, column) => {
        if (
            isEmpty(column.headerFilterValues)
        ) {
            return initialData;
        }
        return initialData.filter((item) => {
            const value = getValueByColumn(item, column);
            if (column?.filter) {
                return column.filter(value, column.headerFilterValues, item);
            }
            return column.headerFilterValues?.includes(getFormattedValue(value, column, item, format));
        });
    }, data);
}

