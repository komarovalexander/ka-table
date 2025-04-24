import React, { RefObject, useEffect, useRef } from 'react';
import { checkIndexOdd, getValueByField } from '../../Utils/DataUtils';
import { getGroupMark, getGroupText, groupSummaryMark } from '../../Utils/GroupUtils';
import { treeDataMark, treeGroupMark } from '../../Utils/TreeUtils';

import DataAndDetailsRows from '../DataAndDetailsRows/DataAndDetailsRows';
import GroupRow from '../GroupRow/GroupRow';
import { GroupSummaryRow } from '../GroupSummaryRow/GroupSummaryRow';
import { ITableBodyProps } from '../../props';
import { getRowEditableCells } from '../../Utils/FilterUtils';

export interface IRowsProps extends ITableBodyProps {
    onFirstRowRendered: (firstRowRef: RefObject<HTMLElement | null>) => any;
    treeGroupsExpanded?: any[];
    isFirstRowOdd?: boolean;
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
        isFirstRowOdd,
        onFirstRowRendered,
        treeGroupsExpanded,
        rowKeyField,
        rowReordering,
        selectedRows,
        validation,
        treeExpandButtonColumnKey,
        oddEvenRows
    } = props;
    const groupMark = getGroupMark();

    const firstRowRef = useRef<HTMLElement>(null);
    useEffect(() => {
        onFirstRowRendered(firstRowRef);
    }, [firstRowRef, onFirstRowRendered]);

    let rowRefLink: any = firstRowRef;
    return (
        <>
            {data.map((d, index) => {
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
                            groupItems={d.groupItems}
                            columns={columns}
                            groupedColumns={groupedColumns}
                            isExpanded={groupsExpanded.some((ge) => JSON.stringify(ge) === JSON.stringify(d.key))}
                            text={getGroupText(d.value, column, format, d.groupItems)}
                            key={JSON.stringify(d.key)}
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
                    const isTreeExpanded = isTreeGroup && (!treeGroupsExpanded || treeGroupsExpanded.includes(rowKeyValue));
                    const isSelectedRow = selectedRows.some((s) => s === rowKeyValue);
                    const isDetailsRowShown = detailsRows.some((r) => r === rowKeyValue);
                    const rowEditableCells = getRowEditableCells(rowKeyValue, editableCells);
                    const isOdd = oddEvenRows
                        ? isFirstRowOdd ? checkIndexOdd(index) : !checkIndexOdd(index)
                        : undefined;
                    const dataRow = (
                        <DataAndDetailsRows
                            isOdd={isOdd}
                            childComponents={props.childComponents}
                            columns={props.columns}
                            dispatch={dispatch}
                            editableCells={props.editableCells}
                            editingMode={props.editingMode}
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
        </>
    );
};

export default Rows;
