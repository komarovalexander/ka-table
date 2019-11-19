import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType, EditingMode, SortingMode } from '../../lib/enums';
import { EventFunc, OptionChangedFunc } from '../../lib/types';

const dataArray = Array(7).fill(undefined).map(
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
    { field: 'column1', title: 'Column 1', dataType: DataType.String },
    { field: 'column2', title: 'Column 2', dataType: DataType.String },
    { field: 'column3', title: 'Column 3', dataType: DataType.String },
    { field: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  editingMode: EditingMode.Cell,
  rowKey: 'id',
  sortingMode: SortingMode.Single,
};

const events: string[] = [];
const EventsDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChanged: OptionChangedFunc = (value) => {
    changeOptions({...option, ...value });
  };

  const [data, changeData] = useState(dataArray);
  const onDataChanged: OptionChangedFunc = (newValue) => {
    changeData(newValue);
  };

  const onEvent: EventFunc = (event, eventData) => {
    events.push(`event: ${event}, data:${JSON.stringify(eventData)}`);
  };
  return (
    <>
      <Table
        {...option}
        data={data}
        onOptionChanged={onOptionChanged}
        onDataChanged={onDataChanged}
        onEvent={onEvent}
      />
      {events.map((e, i) => (<div key={i}>{e}</div>))}
    </>
  );
};

export default EventsDemo;
