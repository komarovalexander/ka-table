import * as React from 'react';

import { updatePageIndex } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { IPagingIndexProps } from '../../props';
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
        {content || text}
    </li>
  );
};

export default PagingIndex;
