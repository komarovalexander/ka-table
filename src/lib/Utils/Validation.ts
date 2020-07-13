import { Column } from '../models';
import { ValidationFunc } from '../types';

export const getValidationValue = (value: any, rowData: any, column: Column, validation?: ValidationFunc) => {
  if (validation) {
    return validation({ value, rowData, column });
  }
  return undefined;
};
