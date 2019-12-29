import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType, FilteringMode } from '../../lib/enums';
import { EditorFuncPropsWithChildren, OptionChangeFunc } from '../../lib/types';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false },
  { id: 3, name: 'Tom Williams', score: 45, passed: false },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false },
];

const CustomLookupEditor: React.FC<EditorFuncPropsWithChildren> = ({
  column: { key: field }, rowData, onValueChange,
}) => {
  const toNullableBoolean = (value: any) => {
    switch (value) {
      case 'true': return true;
      case 'false': return false;
    }
    return value;
  };
  return (
    <div>
      <select
        className='form-control'
        autoFocus={true}
        defaultValue={rowData[field]}
        onChange={(event) => {
          onValueChange(toNullableBoolean(event.currentTarget.value));
        }}>
        <option value=''/>
        <option value={'true'}>True</option>
        <option value={'false'}>False</option>
      </select>
    </div >
  );
};

const tableOption: ITableOption = {
  columns: [
    {
      dataType: DataType.Boolean,
      editor: CustomLookupEditor,
      filterRowCell: CustomLookupEditor,
      key: 'passed',
      title: 'Passed',
    },
    { key: 'name', title: 'Name', dataType: DataType.String, filterRowCell: () => <></> },
    { key: 'score', title: 'Score', dataType: DataType.Number, filterRowCell: () => <></> },
  ],
  filteringMode: FilteringMode.FilterRow,
  rowKeyField: 'id',
};

const FilterRowCustomEditorDemo: React.FC = () => {
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

export default FilterRowCustomEditorDemo;
