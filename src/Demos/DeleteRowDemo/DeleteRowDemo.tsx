import './DeleteRowDemo.scss';

import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { ActionType, DataType } from '../../lib/enums';
import { defaultReducer } from '../../lib/reducers';
import { CellFuncPropsWithChildren, DispatchFunc } from '../../lib/types';

const dataArray = Array(10).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const DeleteRow: React.FC<CellFuncPropsWithChildren> = ({
  rowData, dispatch,
}) => {
 return (
    <img
      src='static/icons/delete.svg'
      className='delete-row-column-button'
      onClick={() => dispatch(ActionType.DeleteRow, { rowData })}
      alt=''
    />
 );
};

const tableOption: ITableOption = {
  columns: [
    { key: 'column1-1', field: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column1-2', field: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
    { key: ':delete', cell: (props) => <DeleteRow {...props} />, style: { width: 40, textAlign: 'center' } },
  ],
  data: dataArray,
  rowKeyField: 'id',
};

const DeleteRowDemo: React.FC = () => {
  const [loading, changeLoading] = useState(false);
  const [option, changeOptions] = useState(tableOption);
  const onDispath: DispatchFunc = (actionType, actionData) => {
    changeLoading((prevState) => true);
    setTimeout(() => {
      changeOptions((prevState: ITableOption) => defaultReducer(prevState, actionType, actionData));
      changeLoading((prevState) => false);
    }, 1000);
  };

  return (
    <>
      {loading && <div>Loading...</div>}
      <Table
        {...option}
        onDispath={onDispath}
      />
    </>
  );
};

export default DeleteRowDemo;
