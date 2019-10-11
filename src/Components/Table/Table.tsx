import './Table.scss';

import * as React from 'react';

import { EditingMode } from '../../Enums/EditingMode';
import { SortingMode } from '../../Enums/SortingMode';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import defaultOptions from '../../Models/DefaultOptions';
import { FilterRowItem } from '../../Models/FilterRowItem';
import { DataChangedFunc } from '../../Types/DataChangedFunc';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { getCopyOfArrayAndInsertOrReplaceItem } from '../../Utils/ArrayUtils';
import { filterData } from '../../Utils/FilterUtils';
import { sortData } from '../../Utils/SortUtils';
import { convertToColumnTypes } from '../../Utils/TypeUtils';
import FilterRow from '../FilterRow/FilterRow';
import HeadRow from '../HeadRow/HeadRow';
import Row from '../Row/Row';

/**
 * Sets the options of the table which are related to its looks
 */
export interface ITableOption {
  /** Column's settings */
  columns: Column[];
  /** Specifies the array of cells which are being edited */
  editableCells?: Cell[];
  /** Sets the editing mode */
  editingMode?: EditingMode;
  /** Sets filters for columns */
  filterRow?: FilterRowItem[];
  /** Specifies the column unique field which will be used as a key */
  rowKey: string;
  /** Sets the sorting mode */
  sortingMode?: SortingMode;
}

interface ITableEvents {
  /** Called each time Data is changed */
  onDataChanged?: DataChangedFunc;
  /** Called each time ITableOption changed */
  onOptionChanged: OptionChangedFunc;
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
  filterRow,
}) => {
  data = convertToColumnTypes(data, columns);
  data = filterRow ? filterData(data, filterRow) : data;
  data = sortData(columns, data);
  return (
    <div className='tc'>
      <table className={defaultOptions.css.table}>
        <thead className={defaultOptions.css.thead}>
          <HeadRow columns={columns} onOptionChanged={onOptionChanged} sortingMode={sortingMode}/>
        </thead>
        <tbody>
          {filterRow && <FilterRow columns={columns} filterRow={filterRow} onOptionChanged={onOptionChanged}/>}
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
                  const newData = getCopyOfArrayAndInsertOrReplaceItem(rowData, rowKey, data);
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
