import EmptyCells from '../EmptyCells/EmptyCells';
import FilterCell from '../FilterCell/FilterCell';
import { IFilterRowProps } from '../../props';
import React from 'react';
import VirtualColumnSpacer from '../VirtualColumnSpacer/VirtualColumnSpacer';
import defaultOptions from '../../defaultOptions';
import { isVirtualColumnSpacer } from '../../Utils/Virtualize';

const FilterRow: React.FunctionComponent<IFilterRowProps> = ({
    childComponents,
    columns,
    dispatch,
    groupColumnsCount,
}) => {
    return (
        <tr className={`ka-filter-row ${defaultOptions.css.theadRow} ka-tr`}>
            <EmptyCells count={groupColumnsCount} isTh={true} childComponents={childComponents}/>
            {columns.map((column) => {
                if (isVirtualColumnSpacer(column)) {
                    return <VirtualColumnSpacer key={column.key} isHead={true} />;
                }
                return (
                    <FilterCell
                        key={column.key}
                        column={column}
                        childComponents={childComponents}
                        dispatch={dispatch}
                    />
                );
            })}
        </tr>
    );
};

export default FilterRow;
