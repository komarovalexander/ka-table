import * as React from 'react';

import { ITableAllProps } from '../..';
import defaultOptions from '../../defaultOptions';
import { ActionType, EditingMode, FilteringMode, SortingMode } from '../../enums';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { getExpandedGroups } from '../../Utils/GroupUtils';
import { prepareTableOptions } from '../../Utils/PropsUtils';
import TableBody from '../TableBody/TableBody';
import { TableHead } from '../TableHead/TableHead';

export const TableWrapper: React.FunctionComponent<ITableAllProps> = (props) => {
  const {
    childComponents = {},
    columnReordering,
    data = [],
    dispatch,
    editableCells = [],
    editingMode = EditingMode.None,
    filteringMode = FilteringMode.None,
    groups,
    height,
    rowReordering = false,
    selectedRows = [],
    sortingMode = SortingMode.None,
    virtualScrolling,
    width
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
    onScroll: virtualScrolling ? (event) => {
      dispatch({
        scrollTop: event.currentTarget.scrollTop,
        type: ActionType.ScrollTable,
      });
    } : undefined,
  }, { ...props, dispatch }, childComponents.tableWrapper);

  const { elementAttributes, content } = getElementCustomization({
    className: defaultOptions.css.table,
  }, { ...props, dispatch }, childComponents.table);
  return (
    <div {...tableWrapper.elementAttributes}>
      {content || tableWrapper.content || (
        <table {...elementAttributes}>
          <TableHead
            areAllRowsSelected={areAllRowsSelected}
            childComponents={childComponents}
            columnReordering={columnReordering}
            columns={preparedOptions.columns}
            dispatch={dispatch}
            filteringMode={filteringMode}
            groupColumnsCount={preparedOptions.groupColumnsCount}
            sortingMode={sortingMode}
          />
          <TableBody
              {...props}
              childComponents={childComponents}
              columns={preparedOptions.columns}
              data={preparedOptions.groupedData}
              dispatch={dispatch}
              editableCells={editableCells}
              editingMode={editingMode}
              groupColumnsCount={preparedOptions.groupColumnsCount}
              groupedColumns={preparedOptions.groupedColumns}
              groupsExpanded={groupsExpanded}
              rowReordering={rowReordering}
              selectedRows={selectedRows}
          />
        </table>
      )}
    </div>
  );
};
