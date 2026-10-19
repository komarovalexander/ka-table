import * as React from 'react';

import { updatePageSize } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { IPagingSizeProps } from '../../props';
import { buttonAttributes } from '../../Utils/AriaUtils';
import { getElementCustomization } from '../../Utils/ComponentUtils';

const PagingSize: React.FunctionComponent<IPagingSizeProps> = (props) => {
    const {
        childComponents,
        dispatch,
        pageSize,
        value
    } = props;
    const isActive = pageSize === value;
    const { elementAttributes, content } = getElementCustomization({
        className: `${defaultOptions.css.pagingSize} ${isActive ? 'ka-paging-size-active' : ''}`,
        onClick: () => dispatch(updatePageSize(value))
    }, props, childComponents.pagingSize);
    return  (
        <li
            {...elementAttributes}>
            {content || (
                // the size is chosen from the keyboard: the click is handled by the onClick above
                <span {...buttonAttributes} aria-pressed={isActive}>{value}</span>
            )}
        </li>
    );
};

export default PagingSize;
