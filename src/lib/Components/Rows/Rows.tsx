import React, { RefObject, useEffect, useRef } from 'react';

import { ITableBodyProps } from '../../props';
import { getValueByField } from '../../Utils/DataUtils';
import { getRowEditableCells } from '../../Utils/FilterUtils';
import { getGroupMark, getGroupSummaryMark, getGroupText } from '../../Utils/GroupUtils';
import DataAndDetailsRows from '../DataAndDetailsRows/DataAndDetailsRows';
import GroupRow from '../GroupRow/GroupRow';

export interface IRowsProps extends ITableBodyProps {
  onFirstRowRendered: (firstRowRef: RefObject<HTMLElement>) => any;
}

const Rows: React.FunctionComponent<IRowsProps> = (props) => {
  const {
    childComponents,
    columns,
    data,
    detailsRows = [],
    dispatch,
    editableCells,
    format,
    groupedColumns,
    groups = [],
    groupsExpanded = [],
    onFirstRowRendered,
    rowKeyField,
    rowReordering,
    selectedRows,
    validation,
  } = props;
  const groupMark = getGroupMark();
  const groupSummaryMark = getGroupSummaryMark();

  const firstRowRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    onFirstRowRendered(firstRowRef);
  }, [firstRowRef, onFirstRowRendered]);

  let rowRefLink: any = firstRowRef;
  return (
    <>
      {data.map((d) => {
      if (d.groupMark === groupMark) {
        const groupIndex = d.key.length - 1;
        const group = groups && groups[groupIndex];
        const column = group && groupedColumns.find((c) => c.key === group.columnKey)!;
        return (
          <GroupRow
            childComponents={childComponents}
            column={column}
            contentColSpan={columns.length - groupIndex + groups.length}
            dispatch={dispatch}
            groupIndex={groupIndex}
            groupKey={d.key}
            isExpanded={groupsExpanded.some((ge) => JSON.stringify(ge) === JSON.stringify(d.key))}
            text={getGroupText(d.value, column, format)}
            key={JSON.stringify(d.key)}
          />
        );
      } else if (d.groupSummaryMark === groupSummaryMark) {
        return <tr key={d.key}><td>Summary {JSON.stringify(d.groupData)}</td></tr>;
      } else {
        const rowKeyValue = getValueByField(d, rowKeyField);
        const isSelectedRow = selectedRows.some((s) => s === rowKeyValue);
        const isDetailsRowShown = detailsRows.some((r) => r === rowKeyValue);
        const rowEditableCells = getRowEditableCells(rowKeyValue, editableCells);
        const dataRow = (
          <DataAndDetailsRows
            childComponents={props.childComponents}
            columns={props.columns}
            dispatch={dispatch}
            editableCells={props.editableCells}
            editingMode={props.editingMode}
            format={format}
            groupColumnsCount={props.groupColumnsCount}
            isDetailsRowShown={isDetailsRowShown}
            isSelectedRow={isSelectedRow}
            key={rowKeyValue}
            rowData={d}
            rowEditableCells={rowEditableCells}
            rowKeyField={props.rowKeyField}
            rowKeyValue={rowKeyValue}
            rowReordering={rowReordering}
            selectedRows={props.selectedRows}
            trRef={rowRefLink}
            validation={validation}
          />
        );
        rowRefLink = undefined;
        return dataRow;
      }
    })}
  </>
  );
};

export default Rows;
