import './HoverRowDemo.scss';

import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType } from '../../lib/enums';
import { ChildAttributes } from '../../lib/models';
import { kaReducer } from '../../lib/reducers';
import { DispatchFunc } from '../../lib/types';
import dataArray from './data';

const ROW_MOUSE_ENTER = 'ROW_MOUSE_ENTER';
const ROW_MOUSE_LEAVE = 'ROW_MOUSE_LEAVE';

const tableOption: ITableOption = {
  columns: [
    {
      dataType: DataType.String,
      key: 'name',
      title: 'Representative',
    },
    {
      dataType: DataType.String,
      key: 'phoneNumber',
      title: 'Phone',
    },
    {
      dataType: DataType.Boolean,
      key: 'hasLoyalProgram',
      title: 'Loyal Program',
    },
    {
      dataType: DataType.String,
      field: 'name',
      fieldParents: ['company'],
      key: 'company.name',
      title: 'Company Name',
    },
  ],
  data: dataArray,
  rowKeyField: 'id',
};

const childAttributes: ChildAttributes = {
  dataRow: {
    onMouseEnter: (event, extendedEvent) => {
      const {
        childProps: {
          rowKeyValue,
        },
        dispatch,
      } = extendedEvent;
      dispatch({ type: ROW_MOUSE_ENTER, rowKeyValue });
    },
    onMouseLeave: (event, { dispatch }) => {
      dispatch({ type: ROW_MOUSE_LEAVE });
    },
  },
};

const HoverRowDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const [selectedItem, changeSelectedItem] = useState<any>();
  const dispatch: DispatchFunc = (action) => {
    if (action.type === ROW_MOUSE_ENTER || action.type === ROW_MOUSE_LEAVE) {
      changeSelectedItem(dataArray.find((i) => i.id === action.rowKeyValue));
    }
    changeOptions((prevState: ITableOption) => kaReducer(prevState, action));
  };
  return (
    <div className='hover-row-demo'>
      <Table
        {...option}
        dispatch={dispatch}
        childAttributes={childAttributes}
      />
      { selectedItem && (
        <div className='info'>
          Hovered: {selectedItem.name} ({selectedItem.company.name})
        </div>
      )}
    </div>
  );
};

export default HoverRowDemo;
