import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType, SortDirection } from '../../lib/enums';
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
    { field: 'name', title: 'Name', dataType: DataType.String, sortDirection: SortDirection.Descend },
    { field: 'score', title: 'Score', dataType: DataType.Number },
    { field: 'passed', title: 'Passed', dataType: DataType.Boolean },
  ],
  filterRow: [{
    field: 'name',
    operator: '=',
    value: 'Billi Bob',
  }],
  rowKey: 'id',
};

const FilterRowDemo: React.FC = () => {
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

export default FilterRowDemo;
