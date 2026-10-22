import { Column } from '../../Models/Column';
import { ControlledPropsKeys } from '../../types';
import { ITableProps } from '../Table/Table';
import { isDeepEqual } from '../../Utils/CommonUtils';

// the functions are not the state of the table: the latest ones are always used
const callbackPropsKeys = ['extendedFilter', 'extendedSort', 'filter', 'format', 'search', 'sort', 'validation'] as const;
const callbackPropsKeysSet = new Set<string>(callbackPropsKeys);

// the parent sets them when a remote loading ends: during the loading the table keeps its state
const loadingPropsKeys: ControlledPropsKeys = ['data', 'columns', 'paging', 'selectedRows'];

// the props of the component which are not the state of the table
const componentPropsKeys = ['childComponents', 'children', 'controlledPropsKeys', 'table'];

/**
 * The props which are applied when the parent changes them: all the props except the functions.
 * During a loading (loading.enabled) data, columns, paging and selectedRows are applied when it ends.
 * props.controlledPropsKeys sets the keys explicitly.
 */
export const getControlledPropsKeys = (props: ITableProps, appliedProps: Partial<ITableProps> = {}): ControlledPropsKeys => {
    if (props.controlledPropsKeys) {
        return props.controlledPropsKeys;
    }
    // the keys of the applied props too: a prop which the parent doesn't pass anymore is applied as undefined
    const keys = new Set([...Object.keys(appliedProps), ...Object.keys(props)] as ControlledPropsKeys);
    return [...keys].filter((key) => !componentPropsKeys.includes(key)
        && !callbackPropsKeysSet.has(key)
        && !(props.loading?.enabled && loadingPropsKeys.includes(key)));
};

// the functions which the parent passes
export const getCallbackProps = (props: ITableProps): Partial<ITableProps> => (
    Object.fromEntries(callbackPropsKeys.filter((key) => props[key] !== undefined).map((key) => [key, props[key]]))
);

// the state with the latest functions of the parent: the ones which it doesn't pass anymore are removed
export const withCallbacks = (state: ITableProps, callbacks: Partial<ITableProps>): ITableProps => {
    const result = { ...state };
    callbackPropsKeys.forEach((key) => {
        delete result[key];
    });
    return { ...result, ...callbacks };
};

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
