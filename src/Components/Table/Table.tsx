import * as React from 'react';

import { Column } from '../../Models/Column';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { sortData } from '../../Utils/SortUtils';
import HeadRow from '../HeadRow/HeadRow';
import Row from '../Row/Row';

interface ITableProps {
  /** prop1 description */
  data: any[];
  /**
   * prop1 description
   *
   * @typedef {Object} Config
   */
  columns: Column[];
  /** prop1 description */
  rowKey: string;
  /** prop1 description */
  onOptionChanged: OptionChangedFunc;
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

export default Table;
