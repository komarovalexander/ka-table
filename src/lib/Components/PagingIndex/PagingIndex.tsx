import * as React from 'react';

import { updatePageIndex } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { IPagingIndexProps } from '../../props';
import { buttonAttributes } from '../../Utils/AriaUtils';
import { getElementCustomization } from '../../Utils/ComponentUtils';

const PagingIndex: React.FunctionComponent<IPagingIndexProps> = (props) => {
    const {
        childComponents,
        dispatch,
        isActive,
        pageIndex,
        text
    } = props;
    const { elementAttributes, content } = getElementCustomization({
        className: `${defaultOptions.css.pagingPageIndex} ${isActive ? 'ka-paging-page-index-active' : ''}`,
        onClick: () => dispatch(updatePageIndex(pageIndex))
    }, props, childComponents.pagingIndex);
    return  (
        <li
            {...elementAttributes}>
            {content || (
                // the page is chosen from the keyboard: the click is handled by the onClick above
                <span {...buttonAttributes} aria-current={isActive ? 'page' : undefined}>{text}</span>
            )}
        </li>
    );
};

export default PagingIndex;
