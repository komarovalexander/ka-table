import './Table.scss';

import * as React from 'react';

import { EditingMode } from '../../Enums/EditingMode';
import { SortingMode } from '../../Enums/SortingMode';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import defaultOptions from '../../Models/DefaultOptions';
import { DataChangedFunc } from '../../Types/DataChangedFunc';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { getCopyOfArrayAndReplaceItem } from '../../Utils/ArrayUtils';
import { sortData } from '../../Utils/SortUtils';
import { convertToColumnTypes } from '../../Utils/TypeUtils';
import HeadRow from '../HeadRow/HeadRow';
import Row from '../Row/Row';

/**
 * Sets the options of the table which are related to its looks
 */
export interface ITableOption {
  /** Column's settings */
  columns: Column[];
  /** Specifies the column unique field which will be used as a key */
  rowKey: string;
  /** Specifies the array of cells which are being edited */
  editableCells?: Cell[];
  /** Sets the editing mode */
  editingMode?: EditingMode;
  /** Sets the sorting mode */
  sortingMode?: SortingMode;
}

interface ITableEvents {
  /** Called each time ITableOption changed */
  onOptionChanged: OptionChangedFunc;
  /** Called each time Data is changed */
  onDataChanged?: DataChangedFunc;
}

interface IAllProps extends ITableEvents, ITableOption {
  /** The data which is shown in Table's rows */
  data: any[];
}

/** The Table Component */
const Table: React.FunctionComponent<IAllProps> = ({
  columns,
  data,
  editableCells = [],
  editingMode = EditingMode.None,
  onDataChanged = () => {},
  onOptionChanged,
  rowKey,
  sortingMode = SortingMode.None,
}) => {
  data = convertToColumnTypes(data, columns);
  data = sortData(columns, data);
  return (
    <div className='tc'>
      <table className={defaultOptions.css.table}>
        <thead className={defaultOptions.css.thead}>
          <HeadRow columns={columns} onOptionChanged={onOptionChanged} sortingMode={sortingMode}/>
        </thead>
        <tbody>
          {data.map((d) => {
            const rowKeyValue = d[rowKey];
            return (
              <Row
                key={rowKeyValue}
                columns={columns}
                rowData={d}
                rowKey={rowKey}
                onOptionChanged={onOptionChanged}
                editableCells={editableCells}
                editingMode={editingMode}
                onRowDataChanged={(rowData: any) => {
                  const newData = getCopyOfArrayAndReplaceItem(rowData, rowKey, data);
                  onDataChanged(newData);
                }}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
