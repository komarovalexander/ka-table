import React from 'react';

import defaultOptions from '../../defaultOptions';
import { Action } from '../../enums';
import { isEmpty } from '../../Utils/CommonUtils';
import { IFilterRowEditorProps } from '../CellEditor/CellEditor';

const FilterRowBoolean: React.FunctionComponent<IFilterRowEditorProps> = ({
  column,
  dispatch,
}) => {
  const value = column.filterRowValue;
  return (
    <input autoFocus={true}
      className={defaultOptions.css.checkbox}
      type='checkbox'
      ref={(elem) => elem && (elem.indeterminate = isEmpty(value))}
      checked={value || false}
      onChange={(event) => {
        let filterRowValue: any = event.currentTarget.checked;
        if (value === false) {
          if (filterRowValue === true) {
            filterRowValue = undefined;
          }
        }
        const updatedColumn = {...column, filterRowValue};
        dispatch(Action.ChangeFilterRow, {column: updatedColumn});
      }}
    />
  );
};

export default FilterRowBoolean;
