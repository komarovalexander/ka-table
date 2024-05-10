import * as React from 'react';

import { addElementAttributes, getElementCustomization } from '../../Utils/ComponentUtils';

import HeadCellContent from '../HeadCellContent/HeadCellContent';
import HeadCellResize from '../HeadCellResize/HeadCellResize';
import { IHeadCellProps } from '../../props';
import defaultOptions from '../../defaultOptions';
import { getDraggableProps } from '../../Utils/PropsUtils';
import { getHeadCellClassName } from '../../Utils/HeadRowUtils';
import { isCellResizeShown } from '../../Utils/CellResizeUtils';
import { reorderColumns } from '../../actionCreators';

const HeadCell: React.FunctionComponent<IHeadCellProps> = (props) => {
    const {
        childComponents,
        colSpan,
        column,
        column: { style, isResizable, key },
        columnReordering,
        columnResizing,
        dispatch,
        groupPanel,
        hasChildren,
        isGrouped,
        rowSpan,
        sortingMode
    } = props;
    let {
        childComponents: { headCell }
    } = props;
    if ((columnReordering || groupPanel?.enabled) && !hasChildren) {
        const reorderedRowProps = getDraggableProps({
            key,
            dispatch,
            actionCreator: reorderColumns,
            draggedClass: defaultOptions.css.draggedColumn,
            dragOverClass: defaultOptions.css.dragOverColumn,
            hasReordering: !!columnReordering
        });
        headCell = addElementAttributes(reorderedRowProps, props, headCell);
    }

    const { elementAttributes, content } = getElementCustomization({
        className: getHeadCellClassName(sortingMode, isGrouped),
        colSpan,
        rowSpan,
        scope: 'col',
        style,
        id: key,
    }, props, headCell);

    return (
        <th {...elementAttributes}>
            <div className={defaultOptions.css.theadCellWrapper}>
                <div className={defaultOptions.css.theadCellContentWrapper}>
                    {content || <HeadCellContent {...props} />}
                </div>
                {isCellResizeShown(isResizable, columnResizing) && !hasChildren && (
                    <HeadCellResize
                        column={column}
                        dispatch={dispatch}
                        childComponents={childComponents} />
                )}
            </div>
        </th>
    );
};

export default HeadCell;
