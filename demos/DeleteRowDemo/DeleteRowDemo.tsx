import './DeleteRowDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { deleteRow } from 'ka-table/actionCreators';
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

const DeleteRow: React.FC<ICellTextProps> = ({
  dispatch, rowKeyValue,
}) => {
 return (
    <img
      src='static/icons/delete.svg'
      className='delete-row-column-button'
      onClick={() => dispatch(deleteRow(rowKeyValue))}
      alt=''
    />
 );
};

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'column1-1', field: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column1-2', field: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
    { key: ':delete', width: 70, style: { textAlign: 'center' } },
  ],
  data: dataArray,
  rowKeyField: 'id',
};

const DeleteRowDemo: React.FC = () => {
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
              case ':delete': return <DeleteRow {...props}/>;
            }
          }
        }
      }}
      dispatch={dispatch}
    />
  );
};

export default DeleteRowDemo;
