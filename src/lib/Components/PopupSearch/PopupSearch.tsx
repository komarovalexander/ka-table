import * as React from 'react';

import { ActionType } from '../../enums';
import FilterRowDataType from '../FilterRowDataType/FilterRowDataType';
import { IPopupProps } from '../../props';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { updateHeaderFilterSearchValue } from '../../actionCreators';

const HeaderFilterSearch: React.FC<IPopupProps> = (props) => {
    const { childComponents, dispatch, column } = props;

    const { elementAttributes, content } = getElementCustomization({
        className: `${defaultOptions.css.popupSearch}`
    }, props, childComponents?.popupSearch
    );
    return (
        <div  {...elementAttributes}>
            {content || <FilterRowDataType {...props} column={{...column, filterRowValue: column.headerFilterSearchValue}} dispatch={(action) => {
                if (action.type === ActionType.UpdateFilterRowValue){
                    dispatch(updateHeaderFilterSearchValue(action.columnKey, action.filterRowValue));
                    return;
                }
                dispatch(action);
            }} />}
        </div>
    )
}

export default HeaderFilterSearch;
