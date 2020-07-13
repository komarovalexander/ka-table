import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { SortingMode } from '../../enums';
import { ChildComponents } from '../../Models/ChildComponents';
import { Column } from '../../Models/Column';
import { DispatchFunc } from '../../types';
import { headCellDispatchWrapper } from '../../Utils/CellResizeUtils';
import HeadCellContent from '../HeadCellContent/HeadCellContent';
import HeadCellResize from '../HeadCellResize/HeadCellResize';

export interface IHeadCellProps {
  areAllRowsSelected: boolean;
  childComponents: ChildComponents;
  column: Column;
  dispatch: DispatchFunc;
  sortingMode: SortingMode;
}

const HeadCell: React.FunctionComponent<IHeadCellProps> = (props) => {
  const {
    column: { style, isResizable },
    dispatch
  } = props;
  const [width, setWidth] = React.useState(style ? style.width : undefined);
  const stateStyle = {...style, width};
  const headCellDispatch = headCellDispatchWrapper(setWidth, dispatch);
  return (
    <th scope='col' style={stateStyle} className={defaultOptions.css.theadCell}>
      <div className={defaultOptions.css.theadCellWrapper}>
        <div className={defaultOptions.css.theadCellContentWrapper}>
          <HeadCellContent {...props}/>
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
