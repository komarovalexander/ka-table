import React, { RefObject, useEffect, useRef } from 'react';

import { newRowId } from '../../const';
import { ITableBodyProps } from '../../props';
import { getRowEditableCells } from '../../Utils/FilterUtils';
import { getGroupMark, getGroupText } from '../../Utils/GroupUtils';
import DataAndDetailsRows from '../DataAndDetailsRows/DataAndDetailsRows';
import GroupRow from '../GroupRow/GroupRow';
import NewRow from '../NewRow/NewRow';

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
    groupColumnsCount,
    groupedColumns,
    groups = [],
    groupsExpanded = [],
    onFirstRowRendered,
    rowKeyField,
    selectedRows,
    validation,
  } = props;
  const groupMark = getGroupMark();

  const firstRowRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    onFirstRowRendered(firstRowRef);
  }, [firstRowRef, onFirstRowRendered]);

  let rowRefLink: any = firstRowRef;
  const newRowEditableCells = editableCells && editableCells.filter(c => c.rowKeyValue === newRowId);
  return (
    <>
      {
        newRowEditableCells && !!newRowEditableCells.length && (
        <NewRow
          childComponents={childComponents}
          columns={columns}
          dispatch={dispatch}
          editableCells={newRowEditableCells}
          format={format}
          groupColumnsCount={groupColumnsCount}
          rowKeyField={rowKeyField}
          validation={validation}
        />
      )}
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
            text={getGroupText(d.value, column)}
            key={d.key}
          />
        );
      } else {
        const rowKeyValue = d[rowKeyField];
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
            key={d[rowKeyField]}
            rowData={d}
            rowKeyField={props.rowKeyField}
            rowKeyValue={rowKeyValue}
            rowEditableCells={rowEditableCells}
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
