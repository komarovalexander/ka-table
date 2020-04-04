import React from 'react';

import { updateFilterRowValue } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
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
        dispatch(updateFilterRowValue(column.key, filterRowValue));
      }}
    />
  );
};

export default FilterRowDate;
