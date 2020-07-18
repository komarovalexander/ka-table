import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { DataType, SortDirection, SortingMode } from '../../lib/enums';
import { IDataRowProps } from '../../lib/props';
import { DispatchFunc } from '../../lib/types';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false },
  { id: 3, name: 'Tom Williams', score: 45, passed: false },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false },
];

const DataRow: React.FC<IDataRowProps> = ({rowData}) => {
  return (
    <div>
      {rowData.name}: {rowData.score} ({rowData.passed ? 'Passed' : 'Failed'})
    </div>
  );
};

const tablePropsInit: ITableProps = {
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
  data: dataArray,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const CustomDataRowDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  return (
    <Table
      {...tableProps}
      childComponents={{
        dataRow: {
          content: (props) => <DataRow {...props}/>,
        }
      }}
      dispatch={dispatch}
    />
  );
};

export default CustomDataRowDemo;
