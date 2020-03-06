import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { ActionType, DataType, SortDirection, SortingMode } from '../../lib/enums';
import {
  EditorFuncPropsWithChildren, HeaderCellFuncPropsWithChildren, OptionChangeFunc,
} from '../../lib/types';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false },
  { id: 3, name: 'Tom Williams', score: 45, passed: false },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false },
];

const SelectionCell: React.FC<EditorFuncPropsWithChildren> = ({
  rowKeyValue, dispatch, isSelectedRow,
}) => {
  return (
    <input
      type='checkbox'
      checked={isSelectedRow}
      onChange={(event) => {
        if (event.currentTarget.checked) {
          dispatch({ type: ActionType.SelectRow, rowKeyValue });
        } else {
          dispatch({ type: ActionType.DeselectRow, rowKeyValue });
        }
      }}
    />
  );
};

const SelectionHeader: React.FC<HeaderCellFuncPropsWithChildren> = ({
  dispatch, areAllRowsSelected,
}) => {
  return (
    <input
      type='checkbox'
      checked={areAllRowsSelected}
      onChange={(event) => {
        if (event.currentTarget.checked) {
          dispatch({ type: ActionType.SelectAllRows,  });
        } else {
          dispatch({ type: ActionType.DeselectAllRows,  });
        }
      }}
    />
  );
};

const tableOption: ITableOption = {
  columns: [
    {
      editor: SelectionCell,
      headCell: SelectionHeader,
      isEditable: true,
      key: 'selection',
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
  rowKeyField: 'id',
  selectedRows: [3, 5],
  sortingMode: SortingMode.Single,
};

const SelectionDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChange: OptionChangeFunc = (value) => {
    changeOptions({...option, ...value });
  };
  return (
    <Table
      {...option}
      data={dataArray}
      onOptionChange={onOptionChange}
    />
  );
};

export default SelectionDemo;
