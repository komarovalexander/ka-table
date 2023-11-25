import * as React from 'react';

import FilterRow from '../FilterRow/FilterRow';
import { FilteringMode } from '../../enums';
import { GroupedColumnsRow } from '../GroupedColumnsRow/GroupedColumnsRow';
import HeadRow from '../HeadRow/HeadRow';
import { ITableHeadProps } from '../../props';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';

export const TableHead: React.FunctionComponent<ITableHeadProps> = (props) => {
    const {
        areAllRowsSelected,
        childComponents,
        columnReordering,
        columnResizing,
        columns,
        dispatch,
        filteringMode,
        groupColumnsCount,
        groupPanel,
        sortingMode,
        groupedColumns = []
    } = props;
    const { elementAttributes, content } = getElementCustomization({
        className: defaultOptions.css.thead,
    }, props, childComponents.tableHead);
    return (
        <thead {...elementAttributes}>
            {content || (
                <>
                    {groupedColumns.length ? <GroupedColumnsRow {...props} /> : (
                        <HeadRow
                            areAllRowsSelected={areAllRowsSelected}
                            childComponents={childComponents}
                            columnReordering={columnReordering}
                            columnResizing={columnResizing}
                            columns={columns}
                            dispatch={dispatch}
                            groupColumnsCount={groupColumnsCount}
                            groupPanel={groupPanel}
                            sortingMode={sortingMode}
                            filteringMode={filteringMode}
                        />
                    )}
                    {
                        filteringMode === FilteringMode.FilterRow &&
            (
                <FilterRow
                    {...props}
                    dispatch={dispatch}
                />
            )
                    }
                </>
            )}
        </thead>
    );
};
