import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { IDataRowProps } from '../../lib/Components/DataRowContent/DataRowContent';
import { DataType, EditingMode, SortingMode } from '../../lib/enums';
import { Column } from '../../lib/models';
import { DispatchFunc } from '../../lib/types';

const columns: Column[] = Array(100).fill(undefined).map(
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
  columns,
  data: dataArray,
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const ManyColumnsDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <>
      <Table
        {...tableProps}
        childComponents={{
          dataRow: {
            propsAreEqual: (prevProps: IDataRowProps, nextProps: IDataRowProps) => {
              return prevProps.rowEditableCells.length === nextProps.rowEditableCells.length;
            }
          }
        }}
        dispatch={dispatch}
      />
    </>
  );
};

export default ManyColumnsDemo;
