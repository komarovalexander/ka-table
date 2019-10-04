import * as React from 'react';

import HeadRow from './Components/HeadRow/HeadRow';
import Row from './Components/Row/Row';
import { SortDirection } from './Enums/SortDirection';
import { Column } from './Models/Column';
import { OptionChangedParam } from './Models/EventParams/OptionChangedParam';

interface IDataGridProps {
  data: any[];
  columns: Column[];
  rowKey: string;
  onOptionChanged: (newOption: OptionChangedParam) => void;
}

const sortData = (columns: Column[], data: any): any[] => {
  const sortedColumn = columns.find((column) => column.sortDirection);
  if (!sortedColumn) { return data; }
  const columnKey = sortedColumn.key;
  const newData = [...data].sort((a: any, b: any) =>
  (sortedColumn.sortDirection === SortDirection.Ascend
    ? a[columnKey] > b[columnKey] : a[columnKey] < b[columnKey]) ? -1 : 1);
  return newData;
};

const DataGrid: React.FunctionComponent<IDataGridProps> = ({ data, columns, rowKey, onOptionChanged }) => {
  data = sortData(columns, data);
  return (
    <div className='dg'>
      <table>
        <thead>
          <HeadRow columns={columns} onOptionChanged={onOptionChanged} />
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
