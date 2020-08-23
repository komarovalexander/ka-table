import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { DataType } from '../../lib/enums';
import { Column } from '../../lib/models';
import { DispatchFunc } from '../../lib/types';

const columns: Column[] = Array(15).fill(undefined).map(
  (_, index) => ({
    key: 'column' + index,
    style: { width: 150 },
    title: 'Column ' + index,
    type: DataType.String,
  }),
);

const dataArray = Array(30).fill(undefined).map(
  (_, index) => columns.reduce((previousValue: any, currentValue) => {
    previousValue[currentValue.key] = `${currentValue.key} row:${index}`;
    return previousValue;
  }, { id: index }),
);

const tablePropsInit: ITableProps = {
  columnReordering: true,
  columns,
  data: dataArray,
  rowKeyField: 'id'
};

const ColumnReorderingDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <Table
      {...tableProps}
      dispatch={dispatch}
      childComponents={{
        headCellContent: {
          content: ({column}) => {
            return (
            <>
              <img style={{cursor: 'move', position: 'relative', top: 3}} src='static/icons/draggable.svg' alt='draggable' />
              <span>{column.title}</span>
            </>
            );
          }
        }
      }}
    />
  );
};

export default ColumnReorderingDemo;
