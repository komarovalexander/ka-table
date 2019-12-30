import './CommandColumnDemo.scss';

import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType } from '../../lib/enums';
import {
  ActionExecutedFunc, ActionExecuteFunc, CellFuncPropsWithChildren, DataChangeFunc,
  OptionChangeFunc,
} from '../../lib/types';

const DELETE_ACTION = 'delete';

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
        onClick={() => alert(`Row data: \r\n${JSON.stringify(rowData)}`)}
      />
    </div>
  );
};

const DeleteRow: React.FC<CellFuncPropsWithChildren> = ({
  rowData, dispatch,
}) => {
 return (
   <div>
      <img
        src='static/icons/delete.svg'
        className='button'
        onClick={() => dispatch(DELETE_ACTION, { rowData })}
        alt=''
      />
   </div>
 );
};

const tableOption: ITableOption = {
  columns: [
    { key: 'command1', cell: (props) => <AlertCell {...props}/>, style: { width: 40, textAlign: 'center' } },
    { key: 'column1-1', field: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column1-2', field: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
    { key: 'command22', cell: (props) => <DeleteRow {...props} />, style: { width: 40, textAlign: 'center' } },
  ],
  rowKeyField: 'column1',
};

const CommandColumnDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChange: OptionChangeFunc = (value) => {
    changeOptions({...option, ...value });
  };

  const [data, changeData] = useState(dataArray);
  const onDataChange: DataChangeFunc = (newValue) => {
    changeData(newValue);
  };

  const onActionExecute: ActionExecuteFunc = (action, actionData) => {
    if (action === DELETE_ACTION) {
      if (window.confirm(`You are going to delete row \r\n'${JSON.stringify(actionData.rowData)}'. \r\nPress 'OK' to continue`)) {
        const newValue = data.filter(
          (d: any) => d[tableOption.rowKeyField] !== actionData.rowData[tableOption.rowKeyField]);
        changeData(newValue);
      }
    }
  };

  const onActionExecuted: ActionExecutedFunc = (action, actionData) => {
    if (action === DELETE_ACTION) {
      alert(`Row has been deleted \r\n'${JSON.stringify(actionData.rowData)}'`);
    }
  };
  return (
    <Table
      {...option}
      data={data}
      onOptionChange={onOptionChange}
      onDataChange={onDataChange}
      onActionExecute={onActionExecute}
      onActionExecuted={onActionExecuted}
    />
  );
};

export default CommandColumnDemo;
