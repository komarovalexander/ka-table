import React from 'react';

import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import GroupRowContent, { IGroupRowProps } from '../GroupRowContent/GroupRowContent';

const GroupRow: React.FunctionComponent<IGroupRowProps> = (props) => {
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
