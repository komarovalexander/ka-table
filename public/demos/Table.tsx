import * as React from 'react';

import { Column } from '../../Models/Column';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { sortData } from '../../Utils/SortUtils';
import HeadRow from '../HeadRow/HeadRow';
import Row from '../Row/Row';

export interface ITableOption {
  /**
   * Array of column's settings
   */
  columns: Column[];
  /** prop1 description */
  rowKey: string;
}

interface ITableEvents {
  /** ITableEvents onOptionChanged */
  onOptionChanged: OptionChangedFunc;
}

interface IAllProps extends ITableEvents, ITableOption {
  /** The data which is shown in Table's rows */
  data: any[];
}

const Table: React.FunctionComponent<IAllProps> = ({ data, columns, rowKey, onOptionChanged }) => {
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
