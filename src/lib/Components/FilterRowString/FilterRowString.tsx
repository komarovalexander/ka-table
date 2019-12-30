import React from 'react';

import defaultOptions from '../../defaultOptions';
import { Action } from '../../enums';
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
        const updatedColumn = {...column, filterRowValue: event.currentTarget.value};
        dispatch(Action.ChangeFilterRow, { column: updatedColumn });
      }}
    />
  );
};

export default FilterRowString;
