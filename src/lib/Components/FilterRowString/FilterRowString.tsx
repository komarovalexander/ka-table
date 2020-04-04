import React from 'react';

import { updateFilterRowValue } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { IFilterRowEditorProps } from '../CellEditor/CellEditor';

const FilterRowString: React.FunctionComponent<IFilterRowEditorProps> = ({
  column,
  dispatch,
}) => {
  return (
    <input
      type='text'
      className={defaultOptions.css.textInput}
      value={column.filterRowValue || ''}
      onChange={(event) => {
        dispatch(updateFilterRowValue(column.key, event.currentTarget.value));
      }}
    />
  );
};

export default FilterRowString;
