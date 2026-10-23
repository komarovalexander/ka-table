import React, { RefObject, useEffect, useMemo, useRef } from 'react';
import { checkIndexOdd, getValueByField } from '../../Utils/DataUtils';
import { getGroupKeyId, getGroupMark, getGroupText, groupSummaryMark } from '../../Utils/GroupUtils';
import { treeDataMark, treeGroupMark } from '../../Utils/TreeUtils';

import DataAndDetailsRows, { DataAndDetailsRowsMemo } from '../DataAndDetailsRows/DataAndDetailsRows';

import { EditableCell } from '../../Models/EditableCell';
import GroupRow from '../GroupRow/GroupRow';
import { GroupSummaryRow } from '../GroupSummaryRow/GroupSummaryRow';
import { ITableBodyProps } from '../../props';
import { MemoizedRowsContext } from './MemoizedRowsContext';
import { getRowKeyValues } from '../../Utils/RowUtils';

export interface IRowsProps extends ITableBodyProps {
    onFirstRowRendered: (firstRowRef: RefObject<HTMLElement | null>) => void;
    treeGroupsExpanded?: unknown[];
    isFirstRowOdd?: boolean;
}

const emptyArray: never[] = [];

const groupEditableCellsByRow = (editableCells: EditableCell[]) => {
    const editableCellsByRow = new Map<unknown, EditableCell[]>();
    editableCells.forEach((cell) => {
        const rowEditableCells = editableCellsByRow.get(cell.rowKeyValue);
        rowEditableCells ? rowEditableCells.push(cell) : editableCellsByRow.set(cell.rowKeyValue, [cell]);
    });
    return editableCellsByRow;
};

const Rows: React.FunctionComponent<IRowsProps> = (props) => {
    const {
        childComponents,
        columns,
        data,
        detailsRows = emptyArray,
        dispatch,
        editableCells,
        focused,
        format,
        groupedColumns,
        groups = emptyArray,
        groupsExpanded = emptyArray,
        isFirstRowOdd,
        keyboardNavigation,
        onFirstRowRendered,
        treeGroupsExpanded,
        rowKeyField,
        rowReordering,
        selectedRows,
        validation,
        treeExpandButtonColumnKey,
        oddEvenRows,
        memoizedRows,
    } = props;
    const groupMark = getGroupMark();
    const RowComponent = memoizedRows ? DataAndDetailsRowsMemo : DataAndDetailsRows;

    // lookups by key instead of searching the arrays for every row
    const selectedRowsSet = useMemo(() => new Set(selectedRows), [selectedRows]);
    const detailsRowsSet = useMemo(() => new Set(detailsRows), [detailsRows]);
    const treeGroupsExpandedSet = useMemo(() => treeGroupsExpanded && new Set(treeGroupsExpanded), [treeGroupsExpanded]);
    const expandedGroupKeys = useMemo(() => new Set(groupsExpanded.map((groupKey) => getGroupKeyId(groupKey))), [groupsExpanded]);
    const editableCellsByRow = useMemo(() => groupEditableCellsByRow(editableCells), [editableCells]);
    // with the keyboard navigation the first cell gets the focus by Tab while the focused cell is not shown
    const focusedCell = useMemo(() => {
        const cell = focused?.cell;
        if (!keyboardNavigation) {
            return cell;
        }
        const rowKeyValues = getRowKeyValues(data, rowKeyField);
        const isCellShown = cell && rowKeyValues.includes(cell.rowKeyValue) && columns.some((c) => c.key === cell.columnKey);
        if (isCellShown || !rowKeyValues.length || !columns.length) {
            return isCellShown ? cell : undefined;
        }
        return { columnKey: columns[0].key, rowKeyValue: rowKeyValues[0] };
    }, [focused, keyboardNavigation, data, rowKeyField, columns]);

    const firstRowRef = useRef<HTMLElement>(null);
    useEffect(() => {
        onFirstRowRendered(firstRowRef);
    }, [firstRowRef, onFirstRowRendered]);

    let rowRefLink: RefObject<HTMLElement | null> | undefined = firstRowRef;
    return (
        <MemoizedRowsContext.Provider value={!!memoizedRows}>
            {data.map((d, index) => {
                if (d.groupMark === groupMark) {
                    const groupKeyId = getGroupKeyId(d.key);
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
                            groupItems={d.groupItems}
                            columns={columns}
                            groupedColumns={groupedColumns}
                            isExpanded={expandedGroupKeys.has(groupKeyId)}
                            text={getGroupText(d.value, column, format, d.groupItems)}
                            key={groupKeyId}
                        />
                    );
                } else if (d.groupSummaryMark === groupSummaryMark) {
                    return <GroupSummaryRow {...props} groupData={d.groupData} key={d.key} groupIndex={d.groupIndex} />;
                } else {
                    const isTreeGroup = d.treeGroupMark === treeGroupMark;
                    const isTreeData =  d.treeDataMark === treeDataMark;
                    const isTreeRow = isTreeGroup || isTreeData;
                    const rowData = isTreeRow ? d.rowData : d;
                    const rowKeyValue = getValueByField(rowData, rowKeyField);
                    const isTreeExpanded = isTreeGroup && (!treeGroupsExpandedSet || treeGroupsExpandedSet.has(rowKeyValue));
                    const isSelectedRow = selectedRowsSet.has(rowKeyValue);
                    const isDetailsRowShown = detailsRowsSet.has(rowKeyValue);
                    const rowEditableCells = editableCellsByRow.get(rowKeyValue) || emptyArray;
                    const isOdd = oddEvenRows
                        ? isFirstRowOdd ? checkIndexOdd(index) : !checkIndexOdd(index)
                        : undefined;
                    const dataRow = (
                        <RowComponent
                            isOdd={isOdd}
                            childComponents={props.childComponents}
                            columns={props.columns}
                            dispatch={dispatch}
                            editableCells={props.editableCells}
                            editingMode={props.editingMode}
                            focusedColumnKey={focusedCell && focusedCell.rowKeyValue === rowKeyValue ? focusedCell.columnKey : undefined}
                            isTreeGroup={isTreeGroup}
                            isTreeExpanded={isTreeExpanded}
                            treeDeep={isTreeRow === true ? d.treeDeep : undefined}
                            treeExpandButtonColumnKey={treeExpandButtonColumnKey}
                            format={format}
                            groupColumnsCount={props.groupColumnsCount}
                            isDetailsRowShown={isDetailsRowShown}
                            isSelectedRow={isSelectedRow}
                            key={rowKeyValue}
                            rowData={rowData}
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
        </MemoizedRowsContext.Provider>
    );
};

export default Rows;
