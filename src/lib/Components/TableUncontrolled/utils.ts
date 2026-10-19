import { Column } from '../../Models/Column';
import { ControlledPropsKeys } from '../../types';
import { ITableProps } from '../Table/Table';
import { isDeepEqual } from '../../Utils/CommonUtils';

export const getDefaultControlledPropsKeys = (settings?: { loadingEnabled?: boolean }): ControlledPropsKeys => {
    return  settings?.loadingEnabled
        ? ['searchText', 'loading']
        : ['searchText', 'loading', 'data', 'columns', 'paging', 'selectedRows']
}

export const getControlledPropsKeys = (props: ITableProps) => {
    const controlledPropsKeys: ControlledPropsKeys = props.controlledPropsKeys ?
        props.controlledPropsKeys
        : getDefaultControlledPropsKeys({ loadingEnabled: props.loading?.enabled });

    return controlledPropsKeys;
}

export const getControlledProps = (controlledPropsKeys: ControlledPropsKeys, props: ITableProps): Partial<ITableProps> => {
    return controlledPropsKeys.reduce((acc, key) => {
        acc[key] = props[key];
        return acc;
    }, {} as any);
}

const isPlainObject = (value: any) => value != null && typeof value === 'object' && !Array.isArray(value);

/**
 * Applies to the current value only the fields which the parent component has changed (prevValue -> value),
 * so the fields changed inside the table (sorting, width, filters, page index...) are kept.
 */
export const mergeChangedFields = <T extends object>(prevValue: T, value: T, currentValue: T): T => {
    const result: any = { ...currentValue };
    Object.keys(prevValue).concat(Object.keys(value))
        .filter((field, index, fields) => fields.indexOf(field) === index)
        .forEach((field) => {
            const newFieldValue = (value as any)[field];
            if (!isDeepEqual((prevValue as any)[field], newFieldValue)) {
                result[field] = newFieldValue;
            }
        });
    return result;
};

const getColumnKeys = (columns: Column[]) => columns.map((column) => column.key);
const findColumn = (columns: Column[], key: string) => columns.find((column) => column.key === key);

export const mergeColumns = (prevColumns: Column[] = [], columns: Column[] = [], currentColumns: Column[] = []): Column[] => {
    if (isDeepEqual(getColumnKeys(prevColumns), getColumnKeys(columns))) {
        // the same list of columns: keep the current order and apply the changed fields
        return currentColumns.map((currentColumn) => {
            const prevColumn = findColumn(prevColumns, currentColumn.key);
            const column = findColumn(columns, currentColumn.key);
            return prevColumn && column ? mergeChangedFields(prevColumn, column, currentColumn) : currentColumn;
        });
    }
    // columns were added, removed or reordered: use the new list and keep the state of the remaining columns
    return columns.map((column) => {
        const prevColumn = findColumn(prevColumns, column.key);
        const currentColumn = findColumn(currentColumns, column.key);
        return prevColumn && currentColumn ? mergeChangedFields(prevColumn, column, currentColumn) : column;
    });
};

/**
 * Returns the controlled props which the parent component has changed since they were applied (prevProps),
 * merged with the current state of the table (tableProps).
 * Props are compared by value, so props created on every render (columns={[...]}, paging={{...}}) don't reset the state.
 */
export const getPropsToOverride = (
    controlledPropsKeys: ControlledPropsKeys,
    props: ITableProps,
    prevProps: Partial<ITableProps>,
    tableProps: ITableProps
): Partial<ITableProps> => {
    return controlledPropsKeys.reduce((acc, key) => {
        const value: any = props[key];
        const prevValue: any = prevProps[key];
        if (isDeepEqual(prevValue, value)) {
            return acc;
        }
        const currentValue: any = tableProps[key];
        if (key === 'columns') {
            acc.columns = mergeColumns(prevValue, value, currentValue);
        } else if (isPlainObject(prevValue) && isPlainObject(value) && isPlainObject(currentValue)) {
            acc[key] = mergeChangedFields(prevValue, value, currentValue);
        } else {
            acc[key] = value;
        }
        return acc;
    }, {} as any);
}
