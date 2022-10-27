import React from 'react';

import { DataType, Table } from '../../lib';
import defaultOptions from '../../lib/defaultOptions';
import { SortDirection, SortingMode } from '../../lib/enums';
import { IDataRowProps } from '../../lib/props';

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
      columns= {[
        {
          dataType: DataType.String,
          key: 'name',
          sortDirection: SortDirection.Descend,
          width: 100,
          title: 'Student',
        },
        { key: 'score', title: 'Score', dataType: DataType.Number }
      ]}
      data={dataArray}
      rowKeyField={'id'}
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
