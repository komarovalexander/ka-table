import React from 'react';

import defaultOptions from '../../defaultOptions';
import { Action } from '../../enums';
import { IFilterRowEditorProps } from '../CellEditor/CellEditor';

const FilterRowNumber: React.FunctionComponent<IFilterRowEditorProps> = ({
  column,
  dispatch,
}) => {
  const value = column.filterRowValue;
  return (
    <input
      className={defaultOptions.css.numberInput}
      type='number'
      value={value === null || value === undefined ? '' : value}
      onChange={(event) => {
        const filterRowValue = event.currentTarget.value !== '' ? Number(event.currentTarget.value) : null;
        const updatedColumn = {...column, filterRowValue};
        dispatch(Action.ChangeFilterRow, {column: updatedColumn});
      }}
    />
  );
};

export default FilterRowNumber;
