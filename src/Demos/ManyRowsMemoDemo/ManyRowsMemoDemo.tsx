import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import DataRowContent from '../../lib/Components/DataRowContent/DataRowContent';
import { DataType } from '../../lib/enums';
import { IDataRowProps } from '../../lib/props';
import { DispatchFunc } from '../../lib/types';

let dataArray: any[];

const getDataArray = () => {
  if (!dataArray){
    dataArray = Array(300000).fill(undefined).map(
      (_, index) => ({
        column1: `column:1 row:${index}`,
        column2: `column:2 row:${index}`,
        column3: `column:3 row:${index}`,
        column4: `column:4 row:${index}`,
        id: index,
      }),
    );
  }
  return dataArray;
};

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  rowKeyField: 'id',
  virtualScrolling: {
    enabled: true
  },
};

const DataRowContentMemo = React.memo((props: IDataRowProps) => <DataRowContent {...props}/>, () => true);

const ManyRowsMemoDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState({ ...tablePropsInit, data: getDataArray() });
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <Table
      {...tableProps}
      dispatch={dispatch}
      childComponents={{
        cellText: {
          elementAttributes: () => ({ style: {lineHeight: '25px'} }),
        },
        dataRow: {
          content: (props: IDataRowProps) => <DataRowContentMemo {...props}/>
        },
        tableWrapper: {
          elementAttributes: () => ({ style: { maxHeight: 600 }})
        }
      }}
    />
  );
};

export default ManyRowsMemoDemo;
