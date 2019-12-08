import './CommandColumnDemo.scss';

import React, { useState } from 'react';

import { ITableOption, Table } from 'react-table-component';
import { DataType, TextAlign } from 'react-table-component/enums';
import { CellFuncPropsWithChildren, EventFunc, OptionChangedFunc } from 'react-table-component/types';

const DELETE_EVENT = 'delete';

const dataArray = Array(10).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
  }),
);

const AlertCell: React.FC<CellFuncPropsWithChildren> = ({
   rowData,
}) => {
  return (
    <div>
      <img
        src='static/icons/alert.svg'
        className='button'
        alt=''
        onClick={() => alert(`row data: ${JSON.stringify(rowData)}`)}
      />
    </div>
  );
};

const DeleteRow: React.FC<CellFuncPropsWithChildren> = ({
  rowData, onEvent,
}) => {
 return (
   <div>
      <img
        src='static/icons/delete.svg'
        className='button'
        onClick={() => onEvent(DELETE_EVENT, { rowData })}
        alt=''
      />
   </div>
 );
};

const tableOption: ITableOption = {
  columns: [
    { key: 'command1', cell: (props) => <AlertCell {...props}/>, style: { width: 40 }, textAlign: TextAlign.Center },
    { key: 'column1-1', field: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column1-2', field: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
    { key: 'command22', cell: (props) => <DeleteRow {...props} />, style: { width: 40, textAlign: TextAlign.Center } },
  ],
  rowKeyField: 'column1',
};

const CommandColumnDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChanged: OptionChangedFunc = (value) => {
    changeOptions({...option, ...value });
  };

  const [data, changeData] = useState(dataArray);
  const onDataChanged: OptionChangedFunc = (newValue) => {
    changeData(newValue);
  };

  const onEvent: EventFunc = (event, eventData) => {
    if (event === DELETE_EVENT) {
      const newValue = data.filter(
        (d: any) => d[tableOption.rowKeyField] !== eventData.rowData[tableOption.rowKeyField]);
      changeData(newValue);
    }
  };
  return (
    <Table
      {...option}
      data={data}
      onOptionChanged={onOptionChanged}
      onDataChanged={onDataChanged}
      onEvent={onEvent}
    />
  );
};

export default CommandColumnDemo;
