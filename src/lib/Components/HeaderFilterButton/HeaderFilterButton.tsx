import * as React from 'react';

import { FilterIcon } from '../../Icons/FilterIcon';
import { IHeaderFilterButtonProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { updateHeaderFilterPopupState } from '../../actionCreators';

const HeaderFilterButton: React.FC<IHeaderFilterButtonProps> = (props) => {
    const { childComponents, column, dispatch } = props;
    const { elementAttributes, content } = getElementCustomization({
        className: `ka-header-filter-button ${column.headerFilterValues?.length ? 'ka-header-filter-button-has-value' : ''}`,
        onClick: (event: React.SyntheticEvent<HTMLSpanElement>) => {
            event.stopPropagation();
            dispatch(updateHeaderFilterPopupState(column.key, !column.isHeaderFilterPopupShown))
        }
    }, props, childComponents?.headerFilterButton);
    return (
        <span {...elementAttributes}>
            {content || (
                <FilterIcon
                    className={'ka-icon ka-icon-filter ka-pointer ka-header-filter-button-icon'}/>
            )}
        </span>
    )
};

export default HeaderFilterButton;
