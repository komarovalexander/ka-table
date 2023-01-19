import './HoverRowDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType } from 'ka-table/enums';
import { ChildComponents } from 'ka-table/models';
import { DispatchFunc } from 'ka-table/types';
import dataArray from './data';

const ROW_MOUSE_ENTER = 'ROW_MOUSE_ENTER';
const ROW_MOUSE_LEAVE = 'ROW_MOUSE_LEAVE';

const tablePropsInit: ITableProps = {
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
      key: 'company.name',
      title: 'Company Name',
    },
  ],
  data: dataArray,
  rowKeyField: 'id',
};

const childAttributes: ChildComponents = {
  dataRow: {
    elementAttributes: (props) => ({
      title: `${props.rowData.name} ${props.rowData.phoneNumber}`,
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
    }),
  },
};

const HoverRowDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const [selectedItem, changeSelectedItem] = useState<any>();
  const dispatch: DispatchFunc = (action) => {
    if (action.type === ROW_MOUSE_ENTER || action.type === ROW_MOUSE_LEAVE) {
      changeSelectedItem(dataArray.find((i) => i.id === action.rowKeyValue));
    }
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  return (
    <div className='hover-row-demo'>
      <Table
        {...tableProps}
        dispatch={dispatch}
        childComponents={childAttributes}
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
