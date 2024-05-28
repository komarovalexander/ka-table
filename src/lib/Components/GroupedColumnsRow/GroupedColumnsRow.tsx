import * as React from 'react';

import { GroupedColumnResult, getRowsWithGroupedColumns } from '../../Utils/GroupedColumnsUtils';

import EmptyCells from '../EmptyCells/EmptyCells';
import HeadCell from '../HeadCell/HeadCell';
import { IHeadRowProps } from '../../props';
import defaultOptions from '../../defaultOptions';

export const GroupedColumnsRow: React.FunctionComponent<IHeadRowProps> = (props) => {
    const {
        columns,
        groupedColumns = [],
        childComponents,
    } = props
    const rows = getRowsWithGroupedColumns(columns, groupedColumns);
    const columnsKeys = columns.map(c => c.key);
    return (
        <>
            {rows.map((row, index) => (
                (
                    <tr className={defaultOptions.css.theadRow} key={index}>
                        <EmptyCells count={0} isTh={true} childComponents={childComponents}/>
                        {row.map((item: GroupedColumnResult, columnIndex: number) => {
                            return (
                                <HeadCell
                                    {...props}
                                    colSpan={item.colSpan}
                                    rowSpan={item.rowSpan}
                                    column={item.column}
                                    hasChildren={!columnsKeys.includes(item.column.key)}
                                    isGrouped={true}
                                    key={columnIndex}
                                />
                            );
                        })}
                    </tr>
                )))}
        </>
    );
};
