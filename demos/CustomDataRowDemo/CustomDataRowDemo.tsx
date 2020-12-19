import React from 'react';

import { Table } from 'ka-table';
import defaultOptions from 'ka-table/defaultOptions';
import { DataType, SortDirection, SortingMode } from 'ka-table/enums';
import { IDataRowProps } from 'ka-table/props';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false },
  { id: 3, name: 'Tom Williams', score: 45, passed: false },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false },
];

const DataRow: React.FC<IDataRowProps> = ({rowData, columns}) => {
  return (
    <td className={defaultOptions.css.cell} colSpan={columns.length}>
      <div>
        {rowData.name}: {rowData.score} ({rowData.passed ? 'Passed' : 'Failed'})
      </div>
    </td>
  );
};

const CustomDataRowDemo: React.FC = () => {
  return (
    <Table
      columns={[
        {
          dataType: DataType.String,
          key: 'name',
          sortDirection: SortDirection.Descend,
          style: { width: 60 },
          title: 'Student',
        },
        { key: 'score', title: 'Score', dataType: DataType.Number },
      ]}
      data={dataArray}
      rowKeyField='id'
      sortingMode={SortingMode.Single}
      childComponents={{
        dataRow: {
          content: (props) => <DataRow {...props}/>,
        }
      }}
    />
  );
};

export default CustomDataRowDemo;
