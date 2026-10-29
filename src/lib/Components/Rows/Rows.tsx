import React, { RefObject, useEffect, useMemo, useRef } from 'react';
import { checkIndexOdd, getValueByField } from '../../Utils/DataUtils';
import { getGroupKeyId, getGroupText, isGroupRow, isGroupSummaryRow } from '../../Utils/GroupUtils';
import { getReactKey, getRowKeyValues } from '../../Utils/RowUtils';
import { isTreeChildRow, isTreeGroupRow, isTreeRow } from '../../Utils/TreeUtils';
import { isVirtualColumnSpacer } from '../../Utils/Virtualize';

import DataAndDetailsRows, { DataAndDetailsRowsMemo } from '../DataAndDetailsRows/DataAndDetailsRows';

import { EditableCell } from '../../Models/EditableCell';
import GroupRow from '../GroupRow/GroupRow';
import { GroupSummaryRow } from '../GroupSummaryRow/GroupSummaryRow';
import { ITableBodyProps } from '../../props';
import { MemoizedRowsContext } from './MemoizedRowsContext';

export interface IRowsProps extends ITableBodyProps {
    onFirstRowRendered: (firstRowRef: RefObject<HTMLElement | null>) => void;
    treeGroupsExpanded?: unknown[];
    // the index of the stripe of the first row is odd (it gets ka-even): the virtual scrolling doesn't render the rows above it
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
    const RowComponent = memoizedRows ? DataAndDetailsRowsMemo : DataAndDetailsRows;

    // lookups by key instead of searching the arrays for every row
    const selectedRowsSet = useMemo(() => new Set(selectedRows), [selectedRows]);
    const detailsRowsSet = useMemo(() => new Set(detailsRows), [detailsRows]);
    const treeGroupsExpandedSet = useMemo(() => treeGroupsExpanded && new Set(treeGroupsExpanded), [treeGroupsExpanded]);
    const expandedGroupKeys = useMemo(() => new Set(groupsExpanded.map((groupKey) => getGroupKeyId(groupKey))), [groupsExpanded]);
    const editableCellsByRow = useMemo(() => groupEditableCellsByRow(editableCells), [editableCells]);
    // with the keyboard navigation the first row gets the focus by Tab while the focused cell or group row is not shown
    const { focusedCell, focusedGroupKeyId } = useMemo(() => {
        const cell = focused?.cell;
        if (!keyboardNavigation) {
            return { focusedCell: cell };
        }
        const groupKeyIds = data.filter(isGroupRow).map((row) => getGroupKeyId(row.key));
        const groupKeyId = focused?.group && getGroupKeyId(focused.group);
        if (groupKeyId && groupKeyIds.includes(groupKeyId)) {
            return { focusedGroupKeyId: groupKeyId };
        }
        const rowKeyValues = getRowKeyValues(data, rowKeyField);
        // the rendered columns (virtualScrolling.horizontal renders spacers in place of the other ones)
        const cellColumns = columns.filter((c) => !isVirtualColumnSpacer(c));
        if (cell && rowKeyValues.includes(cell.rowKeyValue) && cellColumns.some((c) => c.key === cell.columnKey)) {
            return { focusedCell: cell };
        }
        const firstRow = data.find((row) => !isGroupSummaryRow(row));
        if (firstRow && isGroupRow(firstRow)) {
            return { focusedGroupKeyId: getGroupKeyId(firstRow.key) };
        }
        return rowKeyValues.length && cellColumns.length ? { focusedCell: { columnKey: cellColumns[0].key, rowKeyValue: rowKeyValues[0] } } : {};
    }, [focused, keyboardNavigation, data, rowKeyField, columns]);

    const firstRowRef = useRef<HTMLTableRowElement>(null);
    useEffect(() => {
        onFirstRowRendered(firstRowRef);
    }, [firstRowRef, onFirstRowRendered]);

    let rowRefLink: RefObject<HTMLTableRowElement | null> | undefined = firstRowRef;
    // oddEvenRows: every row starts a stripe, with 'treeRoots' a child of a tree gets the stripe of its root
    const isTreeRootsStripe = oddEvenRows === 'treeRoots';
    let stripeIndex = isFirstRowOdd ? 1 : 0;
    return (
        <MemoizedRowsContext.Provider value={!!memoizedRows}>
            {data.map((d, index) => {
                if (index > 0 && !(isTreeRootsStripe && isTreeChildRow(d))) {
                    stripeIndex++;
                }
                if (isGroupRow(d)) {
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
                            isFocused={focusedGroupKeyId === groupKeyId}
                            text={getGroupText(d.value, column, format, d.groupItems)}
                            key={groupKeyId}
                        />
                    );
                } else if (isGroupSummaryRow(d)) {
                    return <GroupSummaryRow {...props} groupData={d.groupData} key={d.key} groupIndex={d.groupIndex} />;
                } else {
                    const isTreeGroup = isTreeGroupRow(d);
                    const treeRow = isTreeRow(d) ? d : undefined;
                    const rowData = treeRow ? treeRow.rowData : d;
                    const rowKeyValue = getValueByField(rowData, rowKeyField);
                    const isTreeExpanded = isTreeGroup && (!treeGroupsExpandedSet || treeGroupsExpandedSet.has(rowKeyValue));
                    const isSelectedRow = selectedRowsSet.has(rowKeyValue);
                    const isDetailsRowShown = detailsRowsSet.has(rowKeyValue);
                    const rowEditableCells = editableCellsByRow.get(rowKeyValue) || emptyArray;
                    const isOdd = oddEvenRows ? !checkIndexOdd(stripeIndex) : undefined;
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
                            treeDeep={treeRow?.treeDeep}
                            treeExpandButtonColumnKey={treeExpandButtonColumnKey}
                            format={format}
                            groupColumnsCount={props.groupColumnsCount}
                            isDetailsRowShown={isDetailsRowShown}
                            isSelectedRow={isSelectedRow}
                            key={getReactKey(rowKeyValue)}
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
