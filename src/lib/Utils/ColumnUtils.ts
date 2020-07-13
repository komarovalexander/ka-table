import { Column } from '../models';
import { Field } from '../types';

export const getField = (column: Column): Field => {
  return column.field || column.key;
};

export const getLastField = (column: Column): Field => {
  return getField(column).split('.').pop()!;
};

export const getLastFieldParents = (column: Column): Field[] => {
  const fieldParents = getField(column).split('.');
  fieldParents.pop();
  return fieldParents;
};
