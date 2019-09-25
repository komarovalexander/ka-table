import * as React from 'react';

import { Column } from './Models/Column';

interface IDataGridProps {
    data: any[];
    columns: Column[];
    rowKey: string;
}

const DataGrid: React.FunctionComponent<IDataGridProps> = (props) => {
  const { data, columns, rowKey } = props;
  return (
    <div className='dg'>
      <table>
        <thead>
          <tr>{columns.map((column) => <th key={column.key}>{column.name}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d[rowKey]}>
              {columns.map((column) =>
                <td key={column.key}>{d[column.key]}</td>,
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DataGrid.defaultProps = {
  rowKey: 'id',
};

export default DataGrid;
