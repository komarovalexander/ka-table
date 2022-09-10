import * as React from 'react';

import { updateSortDirection } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { FilteringMode } from '../../enums';
import { IHeadCellProps } from '../../props';
import { checkPopupPosition } from '../../Utils/CellUtils';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { isSortingEnabled } from '../../Utils/SortUtils';
import HeaderFilterButton from '../HeaderFilterButton/HeaderFilterButton';
import SortIcon from '../SortIcon/SortIcon';

const HeadCellContent: React.FunctionComponent<IHeadCellProps> = (props) => {
  const {
    column,
    dispatch,
    sortingMode,
    filteringMode,
    childComponents,
  } = props;
  const sortingEnabled = isSortingEnabled(sortingMode, column);
  const onClick = sortingEnabled ? () => {
    dispatch(updateSortDirection(column.key));
  } : undefined;

  const { elementAttributes, content } = getElementCustomization({
    className: `${defaultOptions.css.theadCellContent} ${sortingEnabled ? 'ka-pointer' : ''}`,
    onClick
  }, props, childComponents.headCellContent);


  const refToElement = React.useRef<HTMLDivElement>(null);
  React.useLayoutEffect(() => {
    checkPopupPosition(column, refToElement, dispatch);
  }, [column, dispatch]);


  return (
    <div {...elementAttributes} ref={refToElement}>
      {content || <span>{column.title}</span>}
      {column.sortDirection && sortingEnabled && (
        <SortIcon
          column={column}
          dispatch={dispatch}
          childComponents={childComponents}
        />
      )}
      {(filteringMode === FilteringMode.HeaderFilter) && (
        <HeaderFilterButton
          column={column}
          dispatch={dispatch}
          childComponents={childComponents}
        />
      )
      }
    </div>
  );
};

export default HeadCellContent;
