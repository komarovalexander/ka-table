import * as React from 'react';

import { kaDefaultOptions } from '../../';
import { IHeadCellProps } from '../../props';
import { headCellDispatchWrapper } from '../../Utils/CellResizeUtils';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { isSortingEnabled } from '../../Utils/SortUtils';
import HeadCellContent from '../HeadCellContent/HeadCellContent';
import HeadCellResize from '../HeadCellResize/HeadCellResize';

const HeadCell: React.FunctionComponent<IHeadCellProps> = (props) => {
  const {
    childComponents,
    column: { style, isResizable },
    dispatch,
    sortingMode
  } = props;
  const [width, setWidth] = React.useState(style ? style.width : undefined);
  const stateStyle = {...style, width};
  const headCellDispatch = headCellDispatchWrapper(setWidth, dispatch);

  const { elementAttributes, content } = getElementCustomization({
    className: `${kaDefaultOptions.css.theadCell} ${isSortingEnabled(sortingMode) ? 'ka-pointer' : ''}`,
    style: stateStyle,
    scope: 'col'
  }, props, childComponents.headCell);

  return (
    <th {...elementAttributes}>
      <div className={kaDefaultOptions.css.theadCellWrapper}>
        <div className={kaDefaultOptions.css.theadCellContentWrapper}>
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
