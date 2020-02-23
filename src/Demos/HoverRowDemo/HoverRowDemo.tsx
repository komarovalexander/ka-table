import './HoverRowDemo.scss';

import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType } from '../../lib/enums';
import { ChildAttributes } from '../../lib/models';
import { OptionChangeFunc } from '../../lib/types';
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
      dispatch(ROW_MOUSE_ENTER, {
        rowKeyValue,
      });
    },
    onMouseLeave: (event, { dispatch }) => {
      dispatch(ROW_MOUSE_LEAVE, { });
    },
  },
};

const HoverRowDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const [selectedItem, changeSelectedItem] = useState();
  const onOptionChange: OptionChangeFunc = (value) => {
    changeOptions({...option, ...value });
  };
  const onEvent = (type: string, eventData: any) => {
    if (type === ROW_MOUSE_ENTER || type === ROW_MOUSE_LEAVE) {
      changeSelectedItem(dataArray.find((i) => i.id === eventData.rowKeyValue));
    }
  };
  return (
    <div className='hover-row-demo'>
      <Table
        {...option}
        data={dataArray}
        onOptionChange={onOptionChange}
        childAttributes={childAttributes}
        onEvent={onEvent}
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
