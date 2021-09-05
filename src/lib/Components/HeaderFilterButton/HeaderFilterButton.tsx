import * as React from 'react';

import { updateHeaderFilterPopupState } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { Column } from '../../models';
import { DispatchFunc } from '../../types';

export interface HeaderFilterButtonProps {
  column: Column,
  dispatch: DispatchFunc
}

const HeaderFilterButton: React.FC<HeaderFilterButtonProps> = ({ column, dispatch }) => (
  <span
    onClick={(event: React.SyntheticEvent<HTMLSpanElement>) => {
      event.stopPropagation();
      dispatch(updateHeaderFilterPopupState(column.key, !column.isHeaderFilterPopupShown))
    }}
    className={`${defaultOptions.css.iconFilter} ka-header-filter-button ${column.headerFilterValues?.length ? 'ka-header-filter-button-has-value' : ''}`}/>
);

export default HeaderFilterButton;
