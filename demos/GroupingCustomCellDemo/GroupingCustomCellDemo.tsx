import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';

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
      width: '50%',
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
      childComponents={{
        groupCell: {
          content: (props) => {
            switch (props.column.key){
              case 'type':
              case 'country':
                const folder = props.column.key === 'type' ? 'animals' : 'flags';
                return <img height='30px' src={`static/icons/${folder}/${props.groupKey[props.groupIndex].toLowerCase().replace(' ', '_')}.svg`} alt={props.groupKey[0]} />;
            }
          }
        }
      }}
      dispatch={dispatch}
    />
  );
};

export default GroupingCustomCellDemo;
