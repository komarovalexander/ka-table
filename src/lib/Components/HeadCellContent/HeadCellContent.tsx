import * as React from 'react';

import { updateSortDirection } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { FilteringMode, SortDirection } from '../../enums';
import { IHeadCellProps } from '../../props';
import { checkPopupPosition } from '../../Utils/CellUtils';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { isSortingEnabled } from '../../Utils/SortUtils';
import HeaderFilterButton from '../HeaderFilterButton/HeaderFilterButton';

const HeadCellContent: React.FunctionComponent<IHeadCellProps> = (props) => {
  const {
    column,
    dispatch,
    sortingMode,
    filteringMode,
    childComponents: { headCellContent },
  } = props;
  const sortingEnabled = isSortingEnabled(sortingMode);
  const onClick = sortingEnabled ? () => {
    dispatch(updateSortDirection(column.key));
  } : undefined;

  const { elementAttributes, content } = getElementCustomization({
    className: `${defaultOptions.css.theadCellContent} ${sortingEnabled ? 'ka-pointer' : ''}`,
    onClick
  }, props, headCellContent);


  const refToElement = React.useRef<HTMLDivElement>(document.createElement('div'));
  React.useLayoutEffect(() => {
    checkPopupPosition(column, refToElement, dispatch);
  }, [column, dispatch]);


  return (
    <>
      <div {...elementAttributes} ref={refToElement}>
        {content || <span>{column.title}</span>}
        {column.sortDirection && sortingEnabled && (
          <span
            className={
              column.sortDirection === SortDirection.Ascend
                ? defaultOptions.css.iconSortArrowUp
                : defaultOptions.css.iconSortArrowDown
            }
          >{column.sortIndex}</span>
        )}
        {(filteringMode === FilteringMode.HeaderFilter) && (
          <HeaderFilterButton
            column={column}
            dispatch={dispatch}
          />
        )
        }
      </div>
    </>
  );
};

export default HeadCellContent;
