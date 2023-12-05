import * as React from 'react';

import { FilteringMode } from '../../enums';
import HeaderFilterButton from '../HeaderFilterButton/HeaderFilterButton';
import { IHeadCellProps } from '../../props';
import SortIcon from '../SortIcon/SortIcon';
import { checkPopupPosition } from '../../Utils/CellUtils';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { isSortingEnabled } from '../../Utils/SortUtils';
import { updateSortDirection } from '../../actionCreators';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

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
    useIsomorphicLayoutEffect(() => {
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
            {(filteringMode === FilteringMode.HeaderFilter || filteringMode === FilteringMode.FilterRowAndHeaderFilter) && column.isFilterable !== false && (
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
