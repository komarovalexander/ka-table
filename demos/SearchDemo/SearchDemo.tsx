import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType } from '../../lib/enums';
import { OptionChangedFunc } from '../../lib/types';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false },
  { id: 3, name: 'Tom Williams', score: 45, passed: false },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false },
];

const tableOption: ITableOption = {
  columns: [
    { key: 'name', title: 'Name', dataType: DataType.String, style: { width: '40%' } },
    { key: 'score', title: 'Score', dataType: DataType.Number, style: { width: '10%' } },
    {
      dataType: DataType.Boolean,
      key: 'passed',
      search: (searchText, rowData) => {
        return (searchText === 'false' && !rowData.passed) || (searchText === 'true' && rowData.passed);
      },
      title: 'Passed',
    },
  ],
  rowKeyField: 'id',
  search: 'Billi Bob',
};

const SearchDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChanged: OptionChangedFunc = (value) => {
    changeOptions({...option, ...value });
  };
  return (
    <>
      <input defaultValue={option.search} onChange={(event) => {
        onOptionChanged({ search: event.currentTarget.value });
      }}/>
      <Table
        {...option}
        data={dataArray}
        onOptionChanged={onOptionChanged}
      />
    </>
  );
};

export default SearchDemo;
