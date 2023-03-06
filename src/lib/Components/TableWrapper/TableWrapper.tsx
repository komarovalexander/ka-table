import * as React from 'react';

import { ActionType, EditingMode, FilteringMode, SortingMode } from '../../enums';

import { ColGroup } from '../ColGroup/ColGroup';
import { ITableAllProps } from '../..';
import TableBody from '../TableBody/TableBody';
import { TableFoot } from '../TableFoot/TableFoot';
import { TableHead } from '../TableHead/TableHead';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { getExpandedGroups } from '../../Utils/GroupUtils';
import { isVirtualScrollingEnabled } from '../../Utils/Virtualize';
import { prepareTableOptions } from '../../Utils/PropsUtils';

export const TableWrapper: React.FunctionComponent<ITableAllProps> = (props) => {
  const {
    childComponents = {},
    columnReordering,
    columnResizing,
    data = [],
    dispatch,
    editableCells = [],
    editingMode = EditingMode.None,
    filteringMode = FilteringMode.None,
    groups,
    rowReordering = false,
    selectedRows = [],
    sortingMode = SortingMode.None,
    virtualScrolling,
    noData
  } = props;
  let {
    groupsExpanded,
  } = props;

  const preparedOptions = prepareTableOptions(props);
  if (groups && !groupsExpanded) {
    groupsExpanded = getExpandedGroups(preparedOptions.groupedData);
  }

  const areAllRowsSelected = data.length === selectedRows.length;

  const tableWrapper = getElementCustomization({
    className: defaultOptions.css.tableWrapper,
    onScroll: isVirtualScrollingEnabled(virtualScrolling) ? (event) => {
      dispatch({
        scrollTop: event.currentTarget.scrollTop,
        type: ActionType.ScrollTable,
      });
    } : undefined,
  }, props, childComponents.tableWrapper);

  const { elementAttributes, content } = getElementCustomization({
    className: defaultOptions.css.table,
  }, props, childComponents.table);

  return (
    <div {...tableWrapper.elementAttributes}>
      {content || tableWrapper.content || (
        <table {...elementAttributes}>
          <ColGroup
            columns={preparedOptions.columns}
            groupColumnsCount={preparedOptions.groupColumnsCount}
          />
           {(!noData?.hideHeader || !!preparedOptions.groupedData.length) && <TableHead
            {...props}
            areAllRowsSelected={areAllRowsSelected}
            childComponents={childComponents}
            columnReordering={columnReordering}
            columnResizing={columnResizing}
            columns={preparedOptions.columns}
            dispatch={dispatch}
            filteringMode={filteringMode}
            groupColumnsCount={preparedOptions.groupColumnsCount}
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
  );
};
