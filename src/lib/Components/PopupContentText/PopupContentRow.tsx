import * as React from 'react';
import { updateHeaderFilterValues } from '../../actionCreators';

import { Column } from '../../models';
import { DispatchFunc } from '../../types';

export interface PopupContentRowProps {
  column: Column;
  item?: any;
  dispatch: DispatchFunc;
}

const PopupContentRow: React.FC<PopupContentRowProps> = (props) => {
  const {
    column,
    dispatch,
    item
  } = props;

  let checkbox: boolean = false;

  if (column.headerFilterValues?.includes(item)) {
    checkbox = true;
  }


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let checkedItem: boolean = event.currentTarget.checked;
    if (checkedItem) {
      if (column.headerFilterValues === undefined) {
        column.headerFilterValues = [];
      }
      column.headerFilterValues.push(item);
      dispatch(updateHeaderFilterValues(column.key, column.headerFilterValues));
    } else {
      column.headerFilterValues = column.headerFilterValues?.filter((value) => value !== item);
      dispatch(updateHeaderFilterValues(column.key, column.headerFilterValues));
    }
  }

  return <div className='ka-popup-content-text-wrapper'>
    <div className='ka-popup-content-checkbox'>
      <input
        className='ka-input'
        type="checkbox"
        checked={checkbox}
        onChange={handleChange}
      />
    </div>
    <div className='ka-popup-content-text'>
      {item}
    </div>
  </div>
}

export default PopupContentRow;