import React from 'react';

import defaultOptions from '../../defaultOptions';
import { Events } from '../../enums';
import { IFilterRowEditor } from '../CellEditor/CellEditor';

const FilterRowString: React.FunctionComponent<IFilterRowEditor> = ({
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
        dispatch(Events.FilterRowChanged, { column: updatedColumn });
      }}
    />
  );
};

export default FilterRowString;
