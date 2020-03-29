import React, { useState } from 'react';

import { ITableProps, Table } from '../../lib';
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

const tablePropsInit: ITableProps = {
  columns: [
    {
      dataType: DataType.String,
      groupCell: ({
        groupIndex,
        groupKey,
      }) => <img height='30px' src={`static/icons/animals/${groupKey[groupIndex].toLowerCase()}.svg`} alt={groupKey[0]} />,
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
      groupCell: ({
        groupIndex,
        groupKey,
      }) => <img height='30px' src={`static/icons/flags/${groupKey[groupIndex].toLowerCase().replace(' ', '_')}.svg`} alt={groupKey[0]} />,
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
  groups: [{ columnKey: 'country' }, { columnKey: 'type' }],
  rowKeyField: 'id',
};

const GroupingCustomCellDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  return (
    <Table
      {...tableProps}
      dispatch={dispatch}
    />
  );
};

export default GroupingCustomCellDemo;
