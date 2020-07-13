import './SelectionSingleDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { deselectAllRows, selectSingleRow } from '../../lib/actionCreators';
import { ActionType, DataType } from '../../lib/enums';
import { ChildComponents } from '../../lib/models';
import { DispatchFunc } from '../../lib/types';
import dataArray from './data';

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
    elementAttributes: {
      onClick: (event, { dispatch, childProps }) => {
        dispatch(selectSingleRow(childProps.rowKeyValue));
      },
    }
  },
};

const selectedItemReducer = (state: any, action: any) => {
  switch (action.type) {
    case ActionType.SelectSingleRow: return dataArray.find((i) => i.id === action.rowKeyValue);
    case ActionType.DeselectAllRows: return null;
    default: return state;
  }
};

const SelectionSingleDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const [selectedItem, changeSelectedItem] = useState<any>();

  const dispatch: DispatchFunc = (action) => {
    changeSelectedItem((prevState: any) => selectedItemReducer(prevState, action));
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <div className='selection-single-demo'>
      <Table
        {...tableProps}
        dispatch={dispatch}
        childComponents={childAttributes}
      />
      { selectedItem && (
        <div className='info'>
          <div>
            Selected: {selectedItem.name} ({selectedItem.company.name})
            <button onClick={() => {
              dispatch(deselectAllRows());
            }}>Deselect</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectionSingleDemo;
