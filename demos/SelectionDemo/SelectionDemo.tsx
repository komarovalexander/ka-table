import React, { useState } from 'react';

import { ITableOption, Table } from 'react-table-control';
import { DataType, Events, SortDirection, SortingMode } from 'react-table-control/enums';
import { EditorFuncPropsWithChildren, OptionChangedFunc } from 'react-table-control/types';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false },
  { id: 3, name: 'Tom Williams', score: 45, passed: false },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false },
];

const SelectionCell: React.FC<EditorFuncPropsWithChildren> = ({
  rowData, rowKeyField, onEvent, isSelectedRow,
}) => {
  return (
    <input
      type='checkbox'
      checked={isSelectedRow}
      onChange={(event) => {
        const rowKeyValue = rowData[rowKeyField];
        if (event.currentTarget.checked) {
          onEvent(Events.RowSelected, { rowKeyValue });
        } else {
          onEvent(Events.RowDeselected, { rowKeyValue });
        }
      }}
    />
  );
};

const tableOption: ITableOption = {
  columns: [
    { key: 'commandColumn:selection', editor: SelectionCell, isEditable: true },
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
  const onOptionChanged: OptionChangedFunc = (value) => {
    changeOptions({...option, ...value });
  };
  return (
    <Table
      {...option}
      data={dataArray}
      onOptionChanged={onOptionChanged}
    />
  );
};

export default SelectionDemo;
