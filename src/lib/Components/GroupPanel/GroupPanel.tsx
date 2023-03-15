import * as React from 'react';

import { GroupPanelCell } from '../GroupPanelCell/GroupPanelCell';
import { IGroupPanelProps } from '../../props';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { groupColumn } from '../../actionCreators';
import { isMaxDeep } from '../../Utils/GroupUtils';

export const GroupPanel: React.FunctionComponent<IGroupPanelProps> = (props) => {
  const {
    columns,
    groups,
    groupPanel,
    dispatch,
    childComponents = {},
  } = props;
  const { elementAttributes, content } = getElementCustomization({
    className: defaultOptions.css.groupPanel,
    onDrop: !isMaxDeep(groupPanel, columns, groups) ? (event) => {
      if (event.dataTransfer.getData('ka-draggableKeyValue')){
        const draggableKeyValue = JSON.parse(event.dataTransfer.getData('ka-draggableKeyValue'));
        dispatch(groupColumn(draggableKeyValue));
      }
    } : undefined,
    onDragOver: (event) => {
      event.preventDefault();
    }
  }, props, childComponents.groupPanel);
  return (
    <div {...elementAttributes}>
      {content || groups?.map(group => {
        const column = columns.find(c => c.key === group.columnKey);
        return column && <GroupPanelCell key={column.key} {...props} column={column} />;
      }) || <div className={defaultOptions.css.groupPanelText}>{groupPanel.text}</div>}
    </div>
  );
};
