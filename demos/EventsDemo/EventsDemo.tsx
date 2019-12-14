import React, { useState } from 'react';

import { ITableOption, Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { EventFunc, OptionChangedFunc } from 'ka-table/types';

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
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const EventsDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChange: OptionChangedFunc = (value) => {
    changeOptions({...option, ...value });
  };

  const [data, changeData] = useState(dataArray);
  const onDataChange: OptionChangedFunc = (newValue) => {
    changeData(newValue);
  };

  const [events, changeEvents] = useState([] as string []);
  const onEvent: EventFunc = (event, eventData) => {
    changeEvents([`onEvent: ${event}, data:${JSON.stringify(eventData)}`, ...events]);
  };
  return (
    <>
      <Table
        {...option}
        data={data}
        onOptionChange={onOptionChange}
        onDataChange={onDataChange}
        onEvent={onEvent}
      />
      {events.map((e, i) => (<div key={i}>{e}</div>))}
    </>
  );
};

export default EventsDemo;
