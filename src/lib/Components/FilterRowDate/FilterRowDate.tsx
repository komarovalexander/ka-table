import React from 'react';

import defaultOptions from '../../defaultOptions';
import { Action } from '../../enums';
import { getDateInputValue } from '../../Utils/DateUtils';
import { IFilterRowEditorProps } from '../CellEditor/CellEditor';

const FilterRowDate: React.FunctionComponent<IFilterRowEditorProps> = ({
  column,
  dispatch,
}) => {
  const fieldValue = column.filterRowValue;
  const value = fieldValue && getDateInputValue(fieldValue);
  return (
    <input
      className={defaultOptions.css.dateInput}
      type='date'
      value={value || ''}
      onChange={(event) => {
        const targetValue = event.currentTarget.value;
        const filterRowValue = targetValue ? new Date(targetValue) : null;
        const updatedColumn = {...column, filterRowValue};
        dispatch(Action.ChangeFilterRow, {column: updatedColumn});
      }}
    />
  );
};

export default FilterRowDate;
