import { Column } from '../models';

export const getValidationValue = (value: any, rowData: any, column: Column) => {
  const { validation } = column;
  if (validation) {
    return validation(value, rowData);
  }
  return undefined;
};
