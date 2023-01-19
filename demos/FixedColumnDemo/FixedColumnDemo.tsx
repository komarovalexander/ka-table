import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { Column } from 'ka-table/models';
import { DispatchFunc } from 'ka-table/types';

const columns: Column[] = Array(20).fill(undefined).map(
  (_, index) => ({
    key: 'column' + index,
    width: 150,
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
  columns,
  data: dataArray,
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const FixedColumnDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <div className='fixed-column-demo'>
      <Table
        {...tableProps}
        dispatch={dispatch}
        childComponents={{
          headCell: {
            elementAttributes: (props) => {
                if (props.column.key === 'column0'){
                  return { style: {
                    ...props.column.style,
                    position: 'sticky',
                    left: 0,
                    zIndex: 10,
                  }
                }
              }
            }
          },
          cell: {
            elementAttributes: (props) => {
                if (props.column.key === 'column0'){
                  return { style: {
                    ...props.column.style,
                    position: 'sticky',
                    left: 0,
                    backgroundColor: '#eee',
                  }
                }
              }
            }
          }
        }}
      />
    </div>
  );
};

export default FixedColumnDemo;
