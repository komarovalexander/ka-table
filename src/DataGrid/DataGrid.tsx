import * as React from 'react';

import Cell from './Components/Cell/Cell';
import Row from './Components/Row/Row';
import { Column } from './Models/Column';

interface IDataGridProps {
  data: any[];
  columns: Column[];
  rowKey: string;
}

const DataGrid: React.FunctionComponent<IDataGridProps> = ({ data, columns, rowKey }) => {
  return (
    <div className='dg'>
      <table>
        <thead>
          <tr>{columns.map((column) =>  <Cell key={column.key} text={column.name}/>)}</tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <Row key={d[rowKey]} columns={columns} data={d} />
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
