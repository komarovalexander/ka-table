import './AlertCellDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType } from 'ka-table/enums';
import { ICellTextProps } from 'ka-table/props';
import { DispatchFunc } from 'ka-table/types';

const dataArray = Array(10).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const AlertCell: React.FC<ICellTextProps> = ({
   rowData,
}) => {
  return (
    <img
      src='static/icons/alert.svg'
      className='alert-cell-button'
      alt=''
      onClick={() => alert(`Row data: \r\n${JSON.stringify(rowData)}`)}
    />
  );
};

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'command1', style: { textAlign: 'center' }, width: 70 },
    { key: 'column1-1', field: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column1-2', field: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  data: dataArray,
  rowKeyField: 'id',
};

const AlertCellDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);

  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <Table
      {...tableProps}
      childComponents={{
        cellText: {
          content: (props) => {
            switch (props.column.key){
              case 'command1': return <AlertCell {...props}/>;
            }
          }
        }
      }}
      dispatch={dispatch}
    />
  );
};

export default AlertCellDemo;
