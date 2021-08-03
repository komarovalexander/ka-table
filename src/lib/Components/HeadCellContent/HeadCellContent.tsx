import * as React from 'react';

import { updatePopupPosition, updateSortDirection } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { FilteringMode, SortDirection } from '../../enums';
import { PopupPosition } from '../../Models/PopupPosition';
import { IHeadCellProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { isSortingEnabled } from '../../Utils/SortUtils';
import FilterPopupButton from '../FilterPopupButton/FilterPopupButton';

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
    if (refToElement.current && column.isHeaderFilterPopupShown) {
      const popupPosition: PopupPosition = {
        x: refToElement.current.offsetLeft + (refToElement.current.offsetParent as HTMLElement)?.offsetLeft,
        y: refToElement.current.offsetTop + (refToElement.current.offsetParent as HTMLElement)?.offsetTop + refToElement.current.offsetHeight
      }
      dispatch(updatePopupPosition(popupPosition));
    }
  }, [column.isHeaderFilterPopupShown]); // eslint-disable-line



  return (
    <>
      <div {...elementAttributes} ref={refToElement}>
        {content || <span>{column.title}</span>}
        {(filteringMode === FilteringMode.HeaderFilter) && (
          <FilterPopupButton
            column={column}
            dispatch={dispatch}
          />
        )
        }
        {column.sortDirection && sortingEnabled && (
          <span
            className={
              column.sortDirection === SortDirection.Ascend
                ? defaultOptions.css.iconSortArrowUp
                : defaultOptions.css.iconSortArrowDown
            }
          >{column.sortIndex}</span>
        )}
      </div>
    </>
  );
};

export default HeadCellContent;
