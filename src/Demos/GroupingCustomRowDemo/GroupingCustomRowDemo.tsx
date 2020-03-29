import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { updateGroupsExpanded } from '../../lib/actionCreators';
import EmptyCells from '../../lib/Components/EmptyCells/EmptyCells';
import { DataType } from '../../lib/enums';
import { kaReducer } from '../../lib/reducers';
import { DispatchFunc } from '../../lib/types';

const dataArray = [
  { id: 1, type: 'Cat', name: 'Kas', country: 'Czech Republic', age: 2 },
  { id: 2, type: 'Dog', name: 'Rex', country: 'Montenegro', age: 6 },
  { id: 3, type: 'Cat', name: 'Simba', country: 'France', age: 12 },
  { id: 4, type: 'Dog', name: 'Beethoven', country: 'Czech Republic', age: 3 },
  { id: 5, type: 'Cat', name: 'Hash', country: 'Czech Republic', age: 8 },
];

const tableOption: ITableOption = {
  columns: [
    {
      dataType: DataType.String,
      key: 'type',
      title: 'TYPE',
    },
    {
      dataType: DataType.String,
      key: 'name',
      title: 'NAME',
    },
    {
      dataType: DataType.String,
      key: 'country',
      title: 'COUNTRY',
    },
    {
      dataType: DataType.Number,
      key: 'age',
      style: { width: '50%' },
      title: 'AGE',
    },
  ],
  data: dataArray,
  groupRow: ({
    contentColSpan,
    groupIndex,
    isExpanded,
    dispatch,
    text,
    groupKey,
  }) => (
    <>
      <EmptyCells count={groupIndex}/>
      <td className='ka-group-column' colSpan={contentColSpan}>
        <button
          onClick={() => dispatch(updateGroupsExpanded(groupKey))}
          style={{marginRight: 5}}>{isExpanded ? 'Hide Group Items' : 'Show Group Items'}</button>
        {text}
      </td>
    </>
  ),
  groups: [{ columnKey: 'country' }, { columnKey: 'type' }],
  rowKeyField: 'id',
};

const GroupingCustomRowDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const dispatch: DispatchFunc = (action) => {
    changeOptions((prevState: ITableOption) => kaReducer(prevState, action));
  };
  return (
    <Table
      {...option}
      dispatch={dispatch}
    />
  );
};

export default GroupingCustomRowDemo;
