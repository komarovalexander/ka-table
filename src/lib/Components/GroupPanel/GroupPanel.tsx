import * as React from 'react';

import HeadCellContent from '../HeadCellContent/HeadCellContent';
import { IGroupPanelProps } from '../../props';
import { SortingMode } from '../../enums';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { isSortingEnabled } from '../../Utils/SortUtils';

export const GroupPanel: React.FunctionComponent<IGroupPanelProps> = (props) => {
  const {
    columns,
    groups,
    groupPanel,
    dispatch,
    sortingMode = SortingMode.None,
    childComponents = {},
  } = props;
  const { elementAttributes, content } = getElementCustomization({
    className: defaultOptions.css.groupPanel
  }, props, childComponents.groupPanel);
  return (
    <div {...elementAttributes}>
      {content || groups?.map(group => {
        const column = columns.find(c => c.key === group.columnKey);
        return <div>{
          column && 
            <div className={`${defaultOptions.css.theadCell} ${defaultOptions.css.theadCellHeight} ${defaultOptions.css.theadFixed} ${defaultOptions.css.theadBackground} ${isSortingEnabled(sortingMode) ? 'ka-pointer' : ''}`}>
              <HeadCellContent column={column} sortingMode={sortingMode} dispatch={dispatch} childComponents={childComponents} areAllRowsSelected={false} />
            </div>
          }
        </div>;
      }) || <div className={defaultOptions.css.groupPanelText}>{groupPanel?.text}</div>}
    </div>
  );
};
