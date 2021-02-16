import { LoremIpsum } from 'lorem-ipsum';
import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { DataType } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';

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

const renderedRowSizes: any = {};

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  data: dataArray,
  rowKeyField: 'id',
  virtualScrolling: {
    enabled: true
  },
};

let estimatedItemSize = 40;

const ManyRowsDynamicDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);

  const totalHeight = Object.keys(renderedRowSizes).reduce((sum, key) => sum + parseFloat(renderedRowSizes[key] || 0), 0);
  estimatedItemSize = estimatedItemSize === 40 && Object.keys(renderedRowSizes).length ? Math.floor(totalHeight / Object.keys(renderedRowSizes).length) : estimatedItemSize;
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <Table
      {...tableProps}
      dispatch={dispatch}
      virtualScrolling={{
        ...tableProps.virtualScrolling,
        itemHeight: (rowData) => renderedRowSizes[rowData.id] || estimatedItemSize
      }}
      childComponents={{
        dataRow: {
          elementAttributes: ({ rowData }) => ({
            ref: (ref: any) => {
              if (ref?.offsetHeight){
                renderedRowSizes[rowData.id] = ref.offsetHeight;
              }
            }
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
