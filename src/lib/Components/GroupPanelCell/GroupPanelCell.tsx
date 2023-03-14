import * as React from 'react';

import HeadCellContent from '../HeadCellContent/HeadCellContent';
import { IGroupPanelCellProps } from '../../props';
import { SortingMode } from '../../enums';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { isSortingEnabled } from '../../Utils/SortUtils';

export const GroupPanelCell: React.FunctionComponent<IGroupPanelCellProps> = (props) => {
  const {
    column,
    dispatch,
    sortingMode = SortingMode.None,
    childComponents = {},
  } = props;
  const { elementAttributes, content } = getElementCustomization({
    className: `${defaultOptions.css.groupPanelCell} ${defaultOptions.css.theadCell} ${defaultOptions.css.theadCellHeight} ${defaultOptions.css.theadFixed} ${defaultOptions.css.theadBackground} ${isSortingEnabled(sortingMode) ? 'ka-pointer' : ''}`,
    
    draggable: true,
    onDragStart: (event) => {
        event.dataTransfer.setData('ka-draggableKeyValue-group', JSON.stringify(column.key));
        event.dataTransfer.effectAllowed = 'move';
    }
  }, props, childComponents.groupPanelCell);
  return (
    <div {...elementAttributes}>
      {content || 
        <HeadCellContent column={column} sortingMode={sortingMode} dispatch={dispatch} childComponents={childComponents} areAllRowsSelected={false} />}
    </div>
  );
};
