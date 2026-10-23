import { IDataRowProps, IRowProps } from '../../props';
import { addElementAttributes, getElementCustomization } from '../../Utils/ComponentUtils';

import DataRowContent from '../DataRowContent/DataRowContent';
import EmptyCells from '../EmptyCells/EmptyCells';
import React from 'react';
import defaultOptions from '../../defaultOptions';
import { getDraggableProps } from '../../Utils/PropsUtils';
import { reorderRows } from '../../actionCreators';

const DataRow: React.FunctionComponent<IRowProps> = (props) => {
    const {
        dispatch,
        groupColumnsCount,
        isSelectedRow,
        rowKeyValue,
        rowReordering,
        trRef,
        childComponents,
        isOdd
    } = props;
    let dataRow = childComponents.dataRow;

    if (rowReordering) {
        const reorderedRowProps = getDraggableProps({
            key: rowKeyValue,
            dispatch,
            actionCreator: reorderRows,
            draggedClass: defaultOptions.css.draggedRow,
            dragOverClass: defaultOptions.css.dragOverRow,
            hasReordering: true,
            kind: 'row',
        });
        dataRow = addElementAttributes<IDataRowProps>(reorderedRowProps, props, dataRow);
    }

    const { elementAttributes, content } = getElementCustomization({
        className: `${defaultOptions.css.row} ${isSelectedRow ? defaultOptions.css.rowSelected : ''}${isOdd === undefined ? '' : isOdd ? ' ka-odd' : ' ka-even'}`,
        'aria-selected': isSelectedRow || undefined,
    }, props, dataRow);

    return (
        <tr ref={trRef} {...elementAttributes}>
            {content
                ? <>{content}</>
                : (
                    <>
                        <EmptyCells count={groupColumnsCount} childComponents={childComponents} />
                        <DataRowContent {...props} />
                    </>
                )
            }
        </tr>
    );
};


export default DataRow;
