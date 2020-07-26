import { Column } from '../models';
import { Field } from '../types';

export const getField = (column: Column): Field => {
  return column.field || column.key;
};

export const getLastField = (field: Field): Field => {
  return field.split('.').pop()!;
};

export const getLastFieldParents = (field: Field): Field[] => {
  const fieldParents = field.split('.');
  fieldParents.pop();
  return fieldParents;
};
