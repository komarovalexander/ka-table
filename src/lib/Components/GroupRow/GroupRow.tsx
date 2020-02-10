import React from 'react';

import defaultOptions from '../../defaultOptions';
import { GroupRowFunc } from '../../types';
import GroupRowContent, { IGroupRowProps } from '../GroupRowContent/GroupRowContent';

const GroupRow: React.FunctionComponent<IGroupRowProps & { groupRow?: GroupRowFunc }> = (props) => {
  const { groupRow } = props;
  return (
    <tr className={defaultOptions.css.groupRow}>
      {groupRow ? groupRow(props) : <GroupRowContent {...props} />}
    </tr>
  );
};

export default GroupRow;
