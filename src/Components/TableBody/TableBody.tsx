import * as React from 'react';

import groupMark from '../../Constants/GroupMark';
import { EditingMode } from '../../Enums/EditingMode';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { FilterRowItem } from '../../Models/FilterRowItem';
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
  groups?: string[];
  groupsExpanded?: any[][];
  onDataChanged?: DataChangedFunc;
  onOptionChanged: OptionChangedFunc;
  rowKey: string;
}

const TableBody: React.FunctionComponent<ITableBodyProps> = ({
  columns,
  data,
  editableCells = [],
  editingMode = EditingMode.None,
  filterRow,
  groups,
  groupsExpanded,
  onDataChanged = () => {},
  onOptionChanged,
  rowKey,
}) => {
  const groupedData = groups ? getGroupedData(data, groups, groupsExpanded) : data;

  if (groups && !groupsExpanded) {
    groupsExpanded = [];
    for (const value of groupedData) {
      if (value.groupMark === groupMark) {
        groupsExpanded.push(value.key);
      }
    }
  }
  return (
    <tbody>
      {filterRow && <FilterRow columns={columns} filterRow={filterRow} onOptionChanged={onOptionChanged}/>}
      {groupedData.map((d) => {
        return (
          d.groupMark === groupMark
          ? (
            <tr key={d.key}><td colSpan={columns.length} onClick={() => {
              if (groupsExpanded) {
                const newGroupsExpanded = groupsExpanded.filter((ge) => JSON.stringify(ge) !== JSON.stringify(d.key));
                if (newGroupsExpanded.length === groupsExpanded.length) {
                  newGroupsExpanded.push(d.key);
                }
                onOptionChanged({ groupsExpanded: newGroupsExpanded });
              }
            }}>{d.value.toString()}</td></tr>
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
