import React, { useState } from 'react';

import Table, { ITableOption } from '../../Components/Table/Table';
import { DataType } from '../../Enums/DataType';
import { EditingMode } from '../../Enums/EditingMode';
import { EditorFuncPropsWithChildren } from '../../Types/EditorFuncPropsWithChildren';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { toBoolean } from '../../Utils/TypeUtils';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false, nextTry: new Date(2019, 10, 8, 10) },
  { id: 3, name: 'Tom Williams', score: 45, passed: false, nextTry: new Date(2019, 11, 8, 10) },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false, nextTry: new Date(2019, 10, 9, 10) },
];

const CustomEditor: React.FC<EditorFuncPropsWithChildren> = (props: EditorFuncPropsWithChildren) => {
  const {
    column : {
      field,
    },
    rowData,
    onChangeToText,
    onValueChange,
  } = props;
  const [value, setValue] = useState(rowData[props.column.field]);
  return (
    <div>
    <input type='text' value={value} onChange={(event) => setValue(event.currentTarget.value)}/>
    <button onClick={() => {
      onValueChange({ ...rowData, ...{ [field]: value } });
      onChangeToText();
    }}>Save</button>
    <button onClick={onChangeToText}>Cancel</button>
    </div>
  );
};

const CustomLookupEditor: React.FC<EditorFuncPropsWithChildren> = (props: EditorFuncPropsWithChildren) => {
  const {
    column : {
      field,
    },
    rowData,
    onChangeToText,
    onValueChange,
  } = props;
  const [value, setValue] = useState(rowData[props.column.field]);
  return (
    <div>
      <select
        autoFocus={true}
        defaultValue={value}
        onBlur={() => {
          onValueChange({ ...rowData, ...{ [field]: value } });
          onChangeToText();
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
    {
      dataType: DataType.String,
      editor: CustomEditor,
      field: 'name',
      title: 'Name',
    },
    { field: 'score', title: 'Score', dataType: DataType.Number },
    {
      dataType: DataType.Boolean,
      editor: CustomLookupEditor,
      field: 'passed',
      title: 'Passed',
    },
    { field: 'nextTry', title: 'Next Try', dataType: DataType.Date },
  ],
  editableCells: [{
    field: 'name',
    rowKeyValue: 2,
  }],
  editingMode: EditingMode.Cell,
  rowKey: 'id',
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
