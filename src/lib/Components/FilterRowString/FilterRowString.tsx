import React from 'react';

import { kaDefaultOptions } from '../../';
import { updateFilterRowValue } from '../../actionCreators';
import { IFilterRowEditorProps } from '../../props';

const FilterRowString: React.FunctionComponent<IFilterRowEditorProps> = ({
  column,
  dispatch,
}) => {
  return (
    <input
      type='text'
      className={kaDefaultOptions.css.textInput}
      value={column.filterRowValue || ''}
      onChange={(event) => {
        dispatch(updateFilterRowValue(column.key, event.currentTarget.value));
      }}
    />
  );
};

export default FilterRowString;
