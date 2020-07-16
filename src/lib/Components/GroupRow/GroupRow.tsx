import React from 'react';

import defaultOptions from '../../defaultOptions';
import { GroupRowFunc } from '../../types';
import { getElementCustomization } from '../../Utils/CoponentUtils';
import GroupRowContent, { IGroupRowProps } from '../GroupRowContent/GroupRowContent';

const GroupRow: React.FunctionComponent<IGroupRowProps & { groupRow?: GroupRowFunc }> = (props) => {
  const {
    childComponents
  } = props;

  const { elementAttributes, content } = getElementCustomization({
    className: defaultOptions.css.groupRow
  }, props, childComponents.groupRow);

  return (
    <tr {...elementAttributes}>
      {content ? content : <GroupRowContent {...props} />}
    </tr>
  );
};

export default GroupRow;
