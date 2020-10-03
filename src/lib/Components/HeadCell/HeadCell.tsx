import * as React from 'react';

import { reorderColumns } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { IHeadCellProps } from '../../props';
import { ChildAttributesItem } from '../../types';
import { headCellDispatchWrapper } from '../../Utils/CellResizeUtils';
import { addElementAttributes, getElementCustomization } from '../../Utils/ComponentUtils';
import { getDraggableProps } from '../../Utils/PropsUtils';
import { isSortingEnabled } from '../../Utils/SortUtils';
import HeadCellContent from '../HeadCellContent/HeadCellContent';
import HeadCellResize from '../HeadCellResize/HeadCellResize';

const HeadCell: React.FunctionComponent<IHeadCellProps> = (props) => {
  const {
    colSpan,
    column: { style, isResizable, key },
    columnReordering,
    dispatch,
    rowSpan,
    sortingMode
  } = props;
  let {
    childComponents: { headCell }
  } = props;
  const [width, setWidth] = React.useState(style ? style.width : undefined);
  const stateStyle = {...style, width};
  const headCellDispatch = headCellDispatchWrapper(setWidth, dispatch);

  if (columnReordering){
    const reorderedRowProps: ChildAttributesItem<IHeadCellProps> = getDraggableProps(key, dispatch, reorderColumns, defaultOptions.css.draggedColumn, defaultOptions.css.dragOverColumn);
    headCell = addElementAttributes(reorderedRowProps, props, headCell);
  }

  const { elementAttributes, content } = getElementCustomization({
    className: `${defaultOptions.css.theadCell} ${defaultOptions.css.theadBackground} ${isSortingEnabled(sortingMode) ? 'ka-pointer' : ''}`,
    colSpan,
    rowSpan,
    scope: 'col',
    style: stateStyle
  }, props, headCell);

  return (
    <th {...elementAttributes}>
      <div className={defaultOptions.css.theadCellWrapper}>
        <div className={defaultOptions.css.theadCellContentWrapper}>
         {content || <HeadCellContent {...props}/>}
        </div>
        {isResizable && (
          <HeadCellResize {...props}
            currentWidth={width}
            dispatch={headCellDispatch}/>
        )}
      </div>
    </th>
  );
};

export default HeadCell;
