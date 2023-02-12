import React from 'react';

import { DataType, Table } from '../../lib';
import DataRowContent from '../../lib/Components/DataRowContent/DataRowContent';
import { IDataRowProps } from '../../lib/props';

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

const DataRowContentMemo = React.memo((props: IDataRowProps) => <DataRowContent {...props}/>, () => true);

const ManyRowsMemoDemo: React.FC = () => {
  return (
    <Table
      columns= {[
        { key: 'column1', title: 'Column 1', dataType: DataType.String },
        { key: 'column2', title: 'Column 2', dataType: DataType.String },
        { key: 'column3', title: 'Column 3', dataType: DataType.String },
        { key: 'column4', title: 'Column 4', dataType: DataType.String },
      ]}
      rowKeyField={'id'}
      virtualScrolling= {{
        enabled: true
      }}
      data={getDataArray()}
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
