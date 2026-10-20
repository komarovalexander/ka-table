import * as React from 'react';

import { ActionType, EditingMode, FilteringMode, SortingMode } from '../../enums';

import { ChildComponents } from '../../Models/ChildComponents';
import { ColGroup } from '../ColGroup/ColGroup';
import { ITableAllProps } from '../..';
import TableBody from '../TableBody/TableBody';
import { TableFoot } from '../TableFoot/TableFoot';
import { TableHead } from '../TableHead/TableHead';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { getExpandedGroups } from '../../Utils/GroupUtils';
import { getValueByField } from '../../Utils/DataUtils';
import { KeyboardNavigationContext, isKeyboardNavigationEnabled, useTableKeyboardNavigation } from '../../hooks/UseKeyboardNavigation';
import { isVirtualScrollingEnabled } from '../../Utils/Virtualize';
import { useTableData } from '../../hooks/UseTableData';

// the same empty values on every render, so memoized children are not re-rendered because of new defaults
const emptyArray: any[] = [];
const emptyChildComponents: ChildComponents = {};

const getAreAllRowsSelected = (data: any[], selectedRows: any[], rowKeyField: string) => {
    if (selectedRows.length < data.length) {
        return false;
    }
    const selectedRowsSet = new Set(selectedRows);
    return data.every((d) => selectedRowsSet.has(getValueByField(d, rowKeyField)));
};

export const TableWrapper: React.FunctionComponent<ITableAllProps> = (props) => {
    const {
        childComponents = emptyChildComponents,
        columnReordering,
        groupPanel,
        columnResizing,
        data = emptyArray,
        dispatch,
        editableCells = emptyArray,
        editingMode = EditingMode.None,
        filteringMode = FilteringMode.None,
        groups,
        rowReordering = false,
        selectedRows = emptyArray,
        sortingMode = SortingMode.None,
        virtualScrolling,
        noData,
        rowKeyField,
    } = props;
    const preparedOptions = useTableData(props);
    const groupsExpanded = React.useMemo(
        () => groups && !props.groupsExpanded ? getExpandedGroups(preparedOptions.groupedData) : props.groupsExpanded,
        [groups, props.groupsExpanded, preparedOptions.groupedData]
    );

    const areAllRowsSelected = React.useMemo(
        () => getAreAllRowsSelected(data, selectedRows, rowKeyField),
        [data, selectedRows, rowKeyField]
    );

    const keyboardNavigation = useTableKeyboardNavigation(props, preparedOptions);

    const tableWrapper = getElementCustomization({
        className: defaultOptions.css.tableWrapper,
        onScroll: isVirtualScrollingEnabled(virtualScrolling) ? (event) => {
            dispatch({
                scrollTop: event.currentTarget.scrollTop,
                type: ActionType.ScrollTable,
            });
        } : undefined,
        onKeyDown: keyboardNavigation.onKeyDown,
        onKeyUp: keyboardNavigation.onKeyUp,
    }, props, childComponents.tableWrapper);

    const { elementAttributes, content } = getElementCustomization({
        className: defaultOptions.css.table,
        role: isKeyboardNavigationEnabled(props) ? 'grid' : undefined,
    }, props, childComponents.table);

    return (
        <KeyboardNavigationContext.Provider value={keyboardNavigation.navigation}>
            <div {...tableWrapper.elementAttributes}>
                {content || tableWrapper.content || (
                    <table {...elementAttributes}>
                        <ColGroup
                            columns={preparedOptions.columns}
                            groupColumnsCount={preparedOptions.groupColumnsCount}
                        />
                        {(!noData?.hideHeader || !!data.length) && <TableHead
                            {...props}
                            areAllRowsSelected={areAllRowsSelected}
                            childComponents={childComponents}
                            columnReordering={columnReordering}
                            columnResizing={columnResizing}
                            columns={preparedOptions.columns}
                            dispatch={dispatch}
                            filteringMode={filteringMode}
                            groupColumnsCount={preparedOptions.groupColumnsCount}
                            groupPanel={groupPanel}
                            sortingMode={sortingMode}
                        />}
                        <TableBody
                            {...props}
                            childComponents={childComponents}
                            columns={preparedOptions.columns}
                            data={preparedOptions.groupedData}
                            editableCells={editableCells}
                            editingMode={editingMode}
                            groupColumnsCount={preparedOptions.groupColumnsCount}
                            groupedColumns={preparedOptions.groupedColumns}
                            groupsExpanded={groupsExpanded}
                            keyboardNavigation={isKeyboardNavigationEnabled(props)}
                            rowReordering={rowReordering}
                            selectedRows={selectedRows}
                        />
                        {(childComponents.tableFoot || childComponents.summaryRow || childComponents.summaryCell) && (
                            <TableFoot {...props}
                                data={data}
                                columns={preparedOptions.columns}
                                groupColumnsCount={preparedOptions.groupColumnsCount} />
                        )}
                    </table>
                )}
            </div>
        </KeyboardNavigationContext.Provider>
    );
};
