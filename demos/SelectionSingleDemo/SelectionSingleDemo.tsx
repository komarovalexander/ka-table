import './SelectionSingleDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { deselectAllRows, selectSingleRow } from 'ka-table/actionCreators';
import { DataType } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';
import { kaPropsUtils } from 'ka-table/utils';
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

const SelectionSingleDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  const selectedData = kaPropsUtils.getSelectedData(tableProps).pop();
  return (
    <div className='selection-single-demo'>
      <Table
        {...tableProps}
        dispatch={dispatch}
        childComponents={{
          dataRow: {
            elementAttributes: () => ({
              onClick: (event, extendedEvent) => {
                extendedEvent.dispatch(selectSingleRow(extendedEvent.childProps.rowKeyValue));
              },
            })
          },
        }}
      />
      { selectedData && (
        <div className='info'>
          <div>
            Selected: {selectedData.name} ({selectedData.company.name})
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
