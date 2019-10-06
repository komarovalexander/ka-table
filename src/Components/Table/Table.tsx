import * as React from 'react';

import { Column } from '../../Models/Column';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { sortData } from '../../Utils/SortUtils';
import HeadRow from '../HeadRow/HeadRow';
import Row from '../Row/Row';

/**
 * ITableOption sets the options of the data grid
 */
export interface ITableOption {
  /**
   * Array of column's settings
   */
  columns: Column[];
  /** Specifies the column unique field which will be used as a key */
  rowKey: string;
}

interface ITableEvents {
  /** Called each time ITableOption changed */
  onOptionChanged: OptionChangedFunc;
}

interface IAllProps extends ITableEvents, ITableOption {
  /** The data which is shown in Table's rows */
  data: any[];
}

/** The Table Component */
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
