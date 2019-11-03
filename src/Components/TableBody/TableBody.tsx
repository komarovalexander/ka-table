import * as React from 'react';

import groupMark from '../../Constants/GroupMark';
import { EditingMode } from '../../Enums/EditingMode';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { FilterRowItem } from '../../Models/FilterRowItem';
import { Group } from '../../Models/Group';
import { DataChangedFunc } from '../../Types/DataChangedFunc';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { getCopyOfArrayAndInsertOrReplaceItem } from '../../Utils/ArrayUtils';
import { getGroupedData } from '../../Utils/GroupUtils';
import FilterRow from '../FilterRow/FilterRow';
import Row from '../Row/Row';

export interface ITableBodyProps {
  columns: Column[];
  data: any[];
  editableCells?: Cell[];
  editingMode?: EditingMode;
  filterRow?: FilterRowItem[];
  groups?: Group[];
  onDataChanged?: DataChangedFunc;
  onOptionChanged: OptionChangedFunc;
  rowKey: string;
}

/** The Table Component */
const TableBody: React.FunctionComponent<ITableBodyProps> = ({
  columns,
  data,
  editableCells = [],
  editingMode = EditingMode.None,
  filterRow,
  groups,
  onDataChanged = () => {},
  onOptionChanged,
  rowKey,
}) => {
  data = groups ? getGroupedData(data, groups) : data;
  return (
    <tbody>
      {filterRow && <FilterRow columns={columns} filterRow={filterRow} onOptionChanged={onOptionChanged}/>}
      {data.map((d, index) => {
        return (
          d.groupMark === groupMark
          ? (
            <tr key={d.key}><td colSpan={columns.length}>{d.value.toString()}</td></tr>
          ) : (
            <Row
              key={d[rowKey]}
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
          )
        );
      })}
    </tbody>
  );
};

export default TableBody;
