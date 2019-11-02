import { ValidationFunc } from '../Types/ValidationFunc';

export const getValidationValue = (rowData: any, field: string, validation?: ValidationFunc) => {
  if (validation) {
    return validation(rowData[field], rowData);
  }
};
