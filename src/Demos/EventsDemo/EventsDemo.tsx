import './EventsDemo.scss';

import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType, EditingMode, FilteringMode, SortingMode } from '../../lib/enums';
import { DataChangeFunc, EventFunc, OptionChangeFunc } from '../../lib/types';

const dataArray = Array(20).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const tableOption: ITableOption = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  editingMode: EditingMode.Cell,
  filteringMode: FilteringMode.FilterRow,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const EventsDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChange: OptionChangeFunc = (value) => {
    changeOptions({...option, ...value });
  };

  const [data, changeData] = useState(dataArray);
  const onDataChange: DataChangeFunc = (newValue) => {
    changeData(newValue);
  };

  const [events, changeEvents] = useState([] as any []);
  const onEvent: EventFunc = (type, data) => {
    const date = new Date();
    const time = date.toLocaleTimeString();
    const milliseconds = date.getMilliseconds();
    changeEvents((prevValue) => ([{ type, data: `${JSON.stringify(data)}`, time, milliseconds }, ...prevValue]));
  };
  return (
    <div className='events-demo'>
      <Table
        {...option}
        data={data}
        onOptionChange={onOptionChange}
        onDataChange={onDataChange}
        onEvent={onEvent}
      />
      <div className='events'>{events.map((e, i) =>
        (
          <div key={i}>
            <span className='type'>{e.type}</span> <span className='data'>{e.data}</span> <span className='time'>({e.time}<span className='milliseconds'>:{e.milliseconds}</span>)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsDemo;
