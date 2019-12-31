import { ValidationFunc } from '../types';

export const getValidationValue = (rowData: any, field: string, validation?: ValidationFunc) => {
  if (validation) {
    return validation(rowData[field], rowData);
  }
};
