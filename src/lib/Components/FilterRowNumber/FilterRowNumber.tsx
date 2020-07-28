import React from 'react';

import { kaDefaultOptions } from '../../';
import { updateFilterRowValue } from '../../actionCreators';
import { IFilterRowEditorProps } from '../../props';

const FilterRowNumber: React.FunctionComponent<IFilterRowEditorProps> = ({
  column,
  dispatch,
}) => {
  const value = column.filterRowValue;
  return (
    <input
      className={kaDefaultOptions.css.numberInput}
      type='number'
      value={value === null || value === undefined ? '' : value}
      onChange={(event) => {
        const filterRowValue = event.currentTarget.value !== '' ? Number(event.currentTarget.value) : null;
        dispatch(updateFilterRowValue(column.key, filterRowValue));
      }}
    />
  );
};

export default FilterRowNumber;
