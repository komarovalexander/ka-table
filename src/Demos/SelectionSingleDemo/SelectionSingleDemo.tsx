import './SelectionSingleDemo.scss';

import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { ActionType, DataType } from '../../lib/enums';
import { ChildAttributes } from '../../lib/models';
import { OptionChangeFunc } from '../../lib/types';
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
