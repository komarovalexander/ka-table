import React from 'react';

import { kaDefaultOptions } from '../../';
import { updateFilterRowValue } from '../../actionCreators';
import { IFilterRowEditorProps } from '../../props';
import { isEmpty } from '../../Utils/CommonUtils';

const FilterRowBoolean: React.FunctionComponent<IFilterRowEditorProps> = ({
  column,
  dispatch,
}) => {
  const value = column.filterRowValue;
  return (
    <input
      className={kaDefaultOptions.css.checkbox}
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
        dispatch(updateFilterRowValue(column.key, filterRowValue));
      }}
    />
  );
};

export default FilterRowBoolean;
