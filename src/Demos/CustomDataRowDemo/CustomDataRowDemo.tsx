import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType, SortDirection, SortingMode } from '../../lib/enums';
import { DataRowFuncPropsWithChildren, OptionChangeFunc } from '../../lib/types';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false },
  { id: 3, name: 'Tom Williams', score: 45, passed: false },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false },
];

const DataRow: React.FC<DataRowFuncPropsWithChildren> = ({rowData}) => {
  return (
    <div>
      {rowData.name}: {rowData.score} ({rowData.passed ? 'Passed' : 'Failed'})
    </div>
  );
};

const tableOption: ITableOption = {
  columns: [
    {
      dataType: DataType.String,
      key: 'name',
      sortDirection: SortDirection.Descend,
      style: { width: 60 },
      title: 'Student',
    },
    { key: 'score', title: 'Score', dataType: DataType.Number },
  ],
  dataRow: (props) => <DataRow {...props}/>,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const CustomDataRowDemo: React.FC = () => {
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

export default CustomDataRowDemo;
