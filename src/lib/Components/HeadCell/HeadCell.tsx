import * as React from 'react';

import { addElementAttributes, getElementCustomization } from '../../Utils/ComponentUtils';

import { ChildAttributesItem } from '../../types';
import HeadCellContent from '../HeadCellContent/HeadCellContent';
import HeadCellResize from '../HeadCellResize/HeadCellResize';
import { IHeadCellProps } from '../../props';
import defaultOptions from '../../defaultOptions';
import { getDraggableProps } from '../../Utils/PropsUtils';
import { isCellResizeShown } from '../../Utils/CellResizeUtils';
import { isSortingEnabled } from '../../Utils/SortUtils';
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
    hasChildren,
    isGrouped,
    rowSpan,
    sortingMode
  } = props;
  let {
    childComponents: { headCell }
  } = props;

  let reorderedRowProps: ChildAttributesItem<IHeadCellProps> | undefined = undefined;
  if (columnReordering) {
    reorderedRowProps = getDraggableProps(key, dispatch, reorderColumns, defaultOptions.css.draggedColumn, defaultOptions.css.dragOverColumn, true);
  }

  if(reorderedRowProps){
    headCell = addElementAttributes(reorderedRowProps, props, headCell);
  }

  const { elementAttributes, content } = getElementCustomization({
    className: `${defaultOptions.css.theadCell} ${defaultOptions.css.theadCellHeight} ${defaultOptions.css.theadFixed} ${defaultOptions.css.theadBackground} ${isSortingEnabled(sortingMode) ? 'ka-pointer' : ''} ${isGrouped ? 'ka-thead-grouped-cell' : ''}`,
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
