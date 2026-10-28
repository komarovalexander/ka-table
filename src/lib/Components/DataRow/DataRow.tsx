import { IDataRowProps, IRowProps } from '../../props';
import { addElementAttributes, getElementCustomization } from '../../Utils/ComponentUtils';

import DataRowContent from '../DataRowContent/DataRowContent';
import EmptyCells from '../EmptyCells/EmptyCells';
import { KeyboardNavigationContext } from '../../hooks/UseKeyboardNavigation';
import React from 'react';
import defaultOptions from '../../defaultOptions';
import { getDraggableProps } from '../../Utils/PropsUtils';
import { reorderRows } from '../../actionCreators';

const DataRow: React.FunctionComponent<IRowProps> = (props) => {
    const {
        dispatch,
        groupColumnsCount,
        isSelectedRow,
        isTreeExpanded,
        isTreeGroup,
        rowKeyValue,
        rowReordering,
        treeDeep,
        trRef,
        childComponents,
        isOdd
    } = props;
    let dataRow = childComponents.dataRow;
    // the rows of a tree with the keyboard navigation (treegrid): their level from 1 and the state of the rows with children
    const isTreeGridRow = !!React.useContext(KeyboardNavigationContext) && treeDeep != null;

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
        ...(isTreeGridRow && {
            // the rows without children are indented one more for the missing arrow
            'aria-level': isTreeGroup ? treeDeep! + 1 : treeDeep,
            'aria-expanded': isTreeGroup ? !!isTreeExpanded : undefined,
        }),
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
