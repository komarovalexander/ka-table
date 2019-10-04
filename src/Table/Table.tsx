import * as React from 'react';

import HeadRow from './Components/HeadRow/HeadRow';
import Row from './Components/Row/Row';
import { Column } from './Models/Column';
import { OptionChangedParam } from './Models/EventParams/OptionChangedParam';
import { sortData } from './Utils/SortUtils';

interface ITableProps {
  data: any[];
  columns: Column[];
  rowKey: string;
  onOptionChanged: (newOption: OptionChangedParam) => void;
}

const Table: React.FunctionComponent<ITableProps> = ({ data, columns, rowKey, onOptionChanged }) => {
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

Table.defaultProps = {
  rowKey: 'id',
};

export default Table;
