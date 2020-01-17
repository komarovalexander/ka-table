import React from 'react';

import { getExpandedGroups, getGroupedData } from '../../Utils/GroupUtils';
import NoDataRow from '../NoDataRow/NoDataRow';
import { ITableBodyProps } from '../TableBody/TableBody';
import VirtualizedRows from '../VirtualizedRows/VirtualizedRows';

const Rows: React.FunctionComponent<ITableBodyProps> = (props) => {
  const {
    data,
    groupedColumns,
    groups,
  } = props;

  if (!data.length && props.noDataRow) {
    return <NoDataRow {...props} noDataRow={props.noDataRow}/>;
  }

  let { groupsExpanded } = props;
  const groupedData = groups ? getGroupedData(data, groups, groupedColumns, groupsExpanded) : data;
  if (groups && !groupsExpanded) {
    groupsExpanded = getExpandedGroups(groupedData);
  }
  return (
      <VirtualizedRows
        {...props}
        data={groupedData}
        groupsExpanded={groupsExpanded}
      />
  );
};

export default Rows;
