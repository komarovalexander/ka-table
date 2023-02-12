import { ControlledPropsKeys } from '../../types';
import { ITableProps } from '../Table/Table';

export const getControlledPropsKeys = (props: ITableProps) => {
    const controlledPropsKeys: ControlledPropsKeys = props.controlledPropsKeys ?
        props.controlledPropsKeys
        : props.loading?.enabled
        ? ['searchText', 'loading']
        : ['searchText', 'loading', 'data', 'paging'];

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
