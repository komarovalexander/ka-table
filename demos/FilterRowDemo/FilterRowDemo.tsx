import React, { useState } from 'react';

import { ITableOption, Table } from 'ka-table';
import { DataType, FilteringMode, SortDirection } from 'ka-table/enums';
import { OptionChangeFunc } from 'ka-table/types';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true, nextTry: new Date(2021, 10, 9) },
  { id: 2, name: 'Billi Bob', score: 55, passed: false, nextTry: new Date(2021, 10, 8) },
  { id: 3, name: 'Tom Williams', score: 45, passed: false, nextTry: new Date(2021, 11, 8) },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true, nextTry: new Date(2021, 12, 9) },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true, nextTry: new Date(2021, 11, 12) },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false, nextTry: new Date(2021, 10, 9) },
];

const tableOption: ITableOption = {
  columns: [
    { key: 'name', title: 'Name', dataType: DataType.String, sortDirection: SortDirection.Descend, filterRowValue: 'Billi Bob' },
    { key: 'score', title: 'Score', dataType: DataType.Number },
    { key: 'passed', title: 'Passed', dataType: DataType.Boolean },
    {
      dataType: DataType.Date,
      format: (value: Date) => value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      key: 'nextTry',
      title: 'Next Try',
    },
  ],
  filteringMode: FilteringMode.FilterRow,
  rowKeyField: 'id',
};

const FilterRowDemo: React.FC = () => {
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

export default FilterRowDemo;
