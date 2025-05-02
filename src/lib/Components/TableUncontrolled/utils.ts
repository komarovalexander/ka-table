import { ControlledPropsKeys } from '../../types';
import { ITableProps } from '../Table/Table';

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

export const getPropsToOverride = (controlledPropsKeys: ControlledPropsKeys, props: ITableProps, tableProps: ITableProps) => {
    return controlledPropsKeys.reduce((acc, item) => {
        if (props[item] !== tableProps[item]){
            acc[item] = props[item];
        }
        return acc;
    }, {} as any);
}
