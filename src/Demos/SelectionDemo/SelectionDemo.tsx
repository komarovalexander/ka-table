import './SelectionDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { deselectAllRows, deselectRow, selectAllRows, selectRow } from '../../lib/actionCreators';
import { DataType, SortDirection, SortingMode } from '../../lib/enums';
import { ICellTextProps, IHeadCellProps } from '../../lib/props';
import { DispatchFunc } from '../../lib/types';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false },
  { id: 3, name: 'Tom Williams', score: 45, passed: false },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false },
];

const SelectionCell: React.FC<ICellTextProps> = ({
  rowKeyValue, dispatch, isSelectedRow,
}) => {
  return (
    <input
      type='checkbox'
      checked={isSelectedRow}
      onChange={(event) => {
        if (event.currentTarget.checked) {
          dispatch(selectRow(rowKeyValue));
        } else {
          dispatch(deselectRow(rowKeyValue));
        }
      }}
    />
  );
};

const SelectionHeader: React.FC<IHeadCellProps> = ({
  dispatch, areAllRowsSelected,
}) => {
  return (
    <input
      type='checkbox'
      checked={areAllRowsSelected}
      onChange={(event) => {
        if (event.currentTarget.checked) {
          dispatch(selectAllRows());
        } else {
          dispatch(deselectAllRows());
        }
      }}
    />
  );
};

const tablePropsInit: ITableProps = {
  columns: [
    {
      key: 'selection-cell',
    },
    {
      dataType: DataType.String,
      key: 'name',
      sortDirection: SortDirection.Descend,
      style: { width: '33%' },
      title: 'Name',
    },
    { key: 'score', title: 'Score', style: { width: '10%' }, dataType: DataType.Number },
    { key: 'passed', title: 'Passed', dataType: DataType.Boolean },
  ],
  data: dataArray,
  rowKeyField: 'id',
  selectedRows: [3, 5],
  sortingMode: SortingMode.Single,
};

const SelectionDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  return (
    <div className='selection-demo'>
      <Table
        {...tableProps}
        childComponents={{
          cellText: {
            content: (props) => {
              if (props.column.key === 'selection-cell'){
                return <SelectionCell {...props} />
              }
            }
          },
          headCell: {
            content: (props) => {
              if (props.column.key === 'selection-cell'){
                return <SelectionHeader {...props}/>;
              }
            }
          }
        }}
        dispatch={dispatch}
      />
    </div>
  );
};

export default SelectionDemo;
