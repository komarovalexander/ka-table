import React from 'react';

import { kaDefaultOptions } from '../../';
import { IGroupRowProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import GroupRowContent from '../GroupRowContent/GroupRowContent';

const GroupRow: React.FunctionComponent<IGroupRowProps> = (props) => {
  const {
    childComponents
  } = props;

  const { elementAttributes, content } = getElementCustomization({
    className: kaDefaultOptions.css.groupRow
  }, props, childComponents.groupRow);

  return (
    <tr {...elementAttributes}>
      {content ? content : <GroupRowContent {...props} />}
    </tr>
  );
};

export default GroupRow;
