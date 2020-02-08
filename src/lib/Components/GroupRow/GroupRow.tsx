import React from 'react';

import defaultOptions from '../../defaultOptions';
import GroupRowContent, { IGroupRowProps } from '../GroupRowContent/GroupRowContent';

const GroupRow: React.FunctionComponent<IGroupRowProps> = (props) => {
  return (
    <tr className={defaultOptions.css.groupRow}>
      <GroupRowContent {...props} />
    </tr>
  );
};

export default GroupRow;
