import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType, Events, SortDirection, SortingMode } from '../../lib/enums';
import { Cell } from '../../lib/models';
import {
  CellFuncPropsWithChildren, EditorFuncPropsWithChildren, OptionChangedFunc,
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
  column: { field }, rowData, rowKey, onEvent,
}) => {
  return (
    <div onClick={() => {
      const cell: Cell = { field, rowKeyValue: rowData[rowKey] };
      onEvent(Events.OpenEditor, { cell });
    }}>
      SelectionCell
    </div>
  );
};

const tableOption: ITableOption = {
  columns: [
    { key: 'commandColumn:selection', field: '', editor: SelectionCell, isEditable: true },
    { field: 'name', title: 'Name', dataType: DataType.String, width: '33%', sortDirection: SortDirection.Descend },
    { field: 'score', title: 'Score', width: '10%', dataType: DataType.Number },
    { field: 'passed', title: 'Passed', dataType: DataType.Boolean },
  ],
  rowKey: 'id',
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
