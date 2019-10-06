import * as React from 'react';

import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { sortData } from '../../Utils/SortUtils';
import HeadRow from '../HeadRow/HeadRow';
import Row from '../Row/Row';

/**
 * Sets the options of the data grid which are related to its looks
 */
export interface ITableOption {
  /**
   * Array of column's settings
   */
  columns: Column[];
  /** Specifies the column unique field which will be used as a key */
  rowKey: string;
  /** Specifies the array of cells which are being edited */
  editableCells?: Cell[];
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
const Table: React.FunctionComponent<IAllProps> = ({ data, columns, rowKey, onOptionChanged, editableCells }) => {
  data = sortData(columns, data);
  return (
    <div className='tc'>
      <table>
        <thead>
          <HeadRow columns={columns} onOptionChanged={onOptionChanged} />
        </thead>
        <tbody>
          {data.map((d) => {
            const rowKeyValue = d[rowKey];
            return (
              <Row
                key={rowKeyValue}
                columns={columns}
                rowData={d}
                rowKeyValue={rowKeyValue}
                onOptionChanged={onOptionChanged}
                editableCells={editableCells || []}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
