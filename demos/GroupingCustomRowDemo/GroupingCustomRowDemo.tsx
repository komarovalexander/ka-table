import React, { useState } from 'react';

import { ITableOption, Table } from 'ka-table';
import EmptyCells from 'ka-table/Components/EmptyCells/EmptyCells';
import { ActionType, DataType } from 'ka-table/enums';
import { OptionChangeFunc } from 'ka-table/types';

const data = [
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
        <button onClick={() => dispatch(ActionType.UpdateGroupsExpanded, {
          groupKey,
        })} style={{marginRight: 5}}>{isExpanded ? 'Hide Group Items' : 'Show Group Items'}</button>
        {text}
      </td>
    </>
  ),
  groups: [{ columnKey: 'country' }, { columnKey: 'type' }],
  rowKeyField: 'id',
};

const GroupingCustomRowDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChange: OptionChangeFunc = (value) => {
    changeOptions({...option, ...value });
  };
  return (
    <Table
      {...option}
      data={data}
      onOptionChange={onOptionChange}
    />
  );
};

export default GroupingCustomRowDemo;
