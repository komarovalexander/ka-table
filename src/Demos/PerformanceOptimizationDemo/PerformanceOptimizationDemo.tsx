
import React, { useEffect, useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { ICellProps } from '../../lib/Components/CellComponent/CellComponent';
import { IDataRowProps } from '../../lib/Components/DataRowContent/DataRowContent';
import { DataType, EditingMode, SortingMode } from '../../lib/enums';
import { Column } from '../../lib/models';
import { DispatchFunc } from '../../lib/types';

const columns: Column[] = Array(5).fill(undefined).map(
  (_, index) => ({
    key: 'column' + index,
    title: 'Column ' + index,
    type: DataType.String,
  }),
);

const dataArray = Array(3000).fill(undefined).map(
  (_, index) => columns.reduce((previousValue: any, currentValue) => {
    previousValue[currentValue.key] = `${currentValue.key} row:${index}`;
    return previousValue;
  }, { id: index }),
);

const tablePropsInit: ITableProps = {
  columns,
  data: dataArray,
  editableCells: [{ columnKey: 'column2', rowKeyValue: 1 }],
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const PerformanceOptimizationDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const [style, changeStyle] = useState({ width: 150 } as any);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  useEffect(() => {
    changeStyle({ width: 150, color: 'red' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Table
        {...tableProps}
        dispatch={dispatch}
        childComponents={{
          dataRow: {
            propsAreEqual: (prevProps: IDataRowProps, nextProps: IDataRowProps) => {
              return prevProps.rowEditableCells.length === nextProps.rowEditableCells.length;
            },
          },
          cell: {
            propsAreEqual: (prevProps: ICellProps, nextProps: ICellProps) => {
              return prevProps.isEditableCell === nextProps.isEditableCell;
            },
            elementAttributes: { style }
          }
        }}
      />
    </>
  );
};

export default PerformanceOptimizationDemo;
