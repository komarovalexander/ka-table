import './SelectionSingleDemo.scss';

import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { selectSingleRow } from '../../lib/actionCreators';
import { ActionType, DataType } from '../../lib/enums';
import { ChildAttributes } from '../../lib/models';
import { kaReducer } from '../../lib/reducers';
import { DispatchFunc } from '../../lib/types';
import dataArray from './data';

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
    onClick: (event, extendedEvent) => {
      const {
        childProps: {
          rowKeyValue,
        },
        dispatch,
      } = extendedEvent;
      dispatch(selectSingleRow(rowKeyValue));
    },
  },
};

const SelectionSingleDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const [selectedItem, changeSelectedItem] = useState();

  const dispatch: DispatchFunc = (action) => {
    if (action.type === ActionType.SelectSingleRow) {
      changeSelectedItem(dataArray.find((i) => i.id === action.rowKeyValue));
    }
    if (action.type === ActionType.DeselectAllRows) {
      changeSelectedItem(null);
    }
    changeOptions((prevState: ITableOption) => kaReducer(prevState, action));
  };
  const deselectClick = () => {
    dispatch({ type: ActionType.DeselectAllRows });
  };
  return (
    <div className='selection-single-demo'>
      <Table
        {...option}
        dispatch={dispatch}
        childAttributes={childAttributes}
      />
      { selectedItem && (
        <div className='info'>
          <div>
            Selected: {selectedItem.name} ({selectedItem.company.name})
            <button onClick={deselectClick}>Deselect</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectionSingleDemo;
