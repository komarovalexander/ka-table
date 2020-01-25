import { Column } from '../models';
import { getValueByColumn } from './DataUtils';

export const getValidationValue = (rowData: any, column: Column) => {
  const { validation } = column;
  if (validation) {
    const value = getValueByColumn(rowData, column);
    return validation(value, rowData);
  }
};
