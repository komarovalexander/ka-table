import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType, EditingMode, Events } from '../../lib/enums';
import { Cell } from '../../lib/models';
import { EditorFuncPropsWithChildren, OptionChangedFunc } from '../../lib/types';
import { getField } from '../../lib/Utils/ColumnUtils';
import { toBoolean } from '../../lib/Utils/TypeUtils';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false, nextTry: new Date(2019, 10, 8, 10) },
  { id: 3, name: 'Tom Williams', score: 45, passed: false, nextTry: new Date(2019, 11, 8, 10) },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false, nextTry: new Date(2019, 10, 9, 10) },
];

const CustomEditor: React.FC<EditorFuncPropsWithChildren> = ({
  column, rowKeyField, rowData, onEvent, onValueChange,
}) => {
  const close = () => {
    const cell: Cell = { columnKey: column.key, rowKey: rowData[rowKeyField] };
    onEvent(Events.CloseEditor, { cell });
  };
  const [value, setValue] = useState(rowData[getField(column)]);
  return (
    <div>
    <input
      className='form-control'
      type='text'
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}/>
    <button onClick={() => {
      onValueChange({ ...rowData, ...{ [getField(column)]: value } });
      close();
    }}>Save</button>
    <button onClick={close}>Cancel</button>
    </div>
  );
};

const CustomLookupEditor: React.FC<EditorFuncPropsWithChildren> = ({
  column: { key: field }, rowData, rowKeyField, onEvent, onValueChange,
}) => {
  const close = () => {
    const cell: Cell = { columnKey: field, rowKey: rowData[rowKeyField] };
    onEvent(Events.CloseEditor, { cell });
  };
  const [value, setValue] = useState(rowData[field]);
  return (
    <div>
      <select
        className='form-control'
        autoFocus={true}
        defaultValue={value}
        onBlur={() => {
          onValueChange({ ...rowData, ...{ [field]: value } });
          close();
        }}
        onChange={(event) => {
          setValue(toBoolean(event.currentTarget.value));
        }}>
        <option value={'true'}>True</option>
        <option value={'false'}>False</option>
      </select>
    </div >
  );
};

const tableOption: ITableOption = {
  columns: [
    { dataType: DataType.String, key: 'name', title: 'Name', editor: CustomEditor, style: { width: '30%' } },
    { key: 'score', title: 'Score', dataType: DataType.Number, style: { width: '10%' } },
    {
      dataType: DataType.Boolean,
      editor: CustomLookupEditor,
      key: 'passed', title: 'Passed',
      style: { width: '10%' },
    },
    {
      dataType: DataType.Date,
      format: (value: Date) => value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      key: 'nextTry',
      title: 'Next Try',
    },
  ],
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
};

const CustomEditorDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChanged: OptionChangedFunc = (value) => {
    changeOptions({...option, ...value });
  };

  const [data, changeData] = useState(dataArray);
  const onDataChanged: OptionChangedFunc = (newValue) => {
    changeData(newValue);
  };
  return (
    <Table
      {...option}
      data={data}
      onOptionChanged={onOptionChanged}
      onDataChanged={onDataChanged}
    />
  );
};

export default CustomEditorDemo;