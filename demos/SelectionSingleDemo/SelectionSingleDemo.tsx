import './SelectionSingleDemo.scss';

import React, { useState } from 'react';

import { ITableOption, Table } from 'ka-table';
import { ActionType, DataType } from 'ka-table/enums';
import { ChildAttributes } from 'ka-table/models';
import { OptionChangeFunc } from 'ka-table/types';
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
      dispatch(ActionType.SelectSingleRow, {
        rowKeyValue,
      });
    },
  },
};

const SelectionSingleDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const [selectedItem, changeSelectedItem] = useState();
  const onOptionChange: OptionChangeFunc = (value) => {
    changeOptions({...option, ...value });
  };
  const onEvent = (type: string, eventData: any) => {
    if (type === ActionType.SelectSingleRow) {
      changeSelectedItem(dataArray.find((i) => i.id === eventData.rowKeyValue));
    }
  };
  const deselectClick = () => {
    changeSelectedItem(null);
    changeOptions({...option, ...{selectedRows: []} });
  };
  return (
    <div className='selection-single-demo'>
      <Table
        {...option}
        data={dataArray}
        onOptionChange={onOptionChange}
        childAttributes={childAttributes}
        onEvent={onEvent}
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
