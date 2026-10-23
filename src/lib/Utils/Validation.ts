import { Column } from '../models';
import { ValidationFunc } from '../types';

export const getValidationValue = <TData>(value: unknown, rowData: TData, column: Column, validation?: ValidationFunc<TData>) => {
    if (validation) {
        return validation({ value, rowData, column });
    }
    return undefined;
};
