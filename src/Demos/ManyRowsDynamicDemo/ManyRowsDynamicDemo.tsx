import { LoremIpsum } from 'lorem-ipsum';
import React, { useState } from 'react';

import { DataType, ITableProps, Table, useTable } from '../../lib';

const lorem = new LoremIpsum({
  wordsPerSentence: {
    min: 1,
    max: 80,
  },
});

const dataArray = Array(10000).fill(undefined).map(
  (_, index) => ({
    column1: lorem.generateWords(),
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const useDynamicRowsOptions = ({ rowKeyField } : ITableProps) => {
  const [renderedRowSizes] = useState<any>({});
  let estimatedItemSize = 40;
  const addRowHeight = (rowData: any, height?: number) => { if (height) { renderedRowSizes[rowData[rowKeyField]] = height; } };
  const totalHeight = Object.keys(renderedRowSizes).reduce((sum, key) => sum + parseFloat(renderedRowSizes[key] || 0), 0);
  estimatedItemSize = estimatedItemSize === 40 && Object.keys(renderedRowSizes).length
    ? Math.floor(totalHeight / Object.keys(renderedRowSizes).length)
    : estimatedItemSize;
  return {
    addRowHeight,
    itemHeight: (rowData: any) => renderedRowSizes[rowData[rowKeyField]] || estimatedItemSize
  }
}


const ManyRowsDynamicDemo: React.FC = () => {
  const table = useTable();
  const { itemHeight, addRowHeight } = useDynamicRowsOptions(table.props);

  return (
    <Table
      table={table}
      columns= {[
        { key: 'column1', title: 'Column 1', dataType: DataType.String },
        { key: 'column2', title: 'Column 2', dataType: DataType.String },
        { key: 'column3', title: 'Column 3', dataType: DataType.String },
        { key: 'column4', title: 'Column 4', dataType: DataType.String },
      ]}
      data={dataArray}
      rowKeyField={'id'}
      virtualScrolling={{
        ...table.props.virtualScrolling,
        itemHeight,
        enabled: true
      }}
      childComponents={{
        dataRow: {
          elementAttributes: ({ rowData }) => ({
            ref: (ref: any) => addRowHeight(rowData, ref?.offsetHeight)
          }),
        },
        tableWrapper: {
          elementAttributes: () => ({ style: { maxHeight: 600 }})
        }
      }}
    />
  );
};

export default ManyRowsDynamicDemo;
