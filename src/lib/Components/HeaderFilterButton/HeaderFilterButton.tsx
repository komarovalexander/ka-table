import * as React from 'react';

import { updateHeaderFilterPopupState } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { IHeaderFilterButtonProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';

const HeaderFilterButton: React.FC<IHeaderFilterButtonProps> = (props) => {
  const { childComponents, column, dispatch } = props;
  const { elementAttributes, content } = getElementCustomization({
    className: `ka-header-filter-button ${column.headerFilterValues?.length ? 'ka-header-filter-button-has-value' : ''}`,
    onClick: (event: React.SyntheticEvent<HTMLSpanElement>) => {
      event.stopPropagation();
      dispatch(updateHeaderFilterPopupState(column.key, !column.isHeaderFilterPopupShown))
    }
  }, props, childComponents?.headFilterButton);
  return (
    <span {...elementAttributes}>
      {content || (
        <span
          className={`${defaultOptions.css.iconFilter} ka-header-filter-button-icon`}/>
      )}
    </span>
  )
};

export default HeaderFilterButton;
