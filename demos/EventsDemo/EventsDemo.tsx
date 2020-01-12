import './EventsDemo.scss';

import React, { useState } from 'react';

import { ITableOption, Table } from 'ka-table';
import { DataType, EditingMode, FilteringMode, SortingMode } from 'ka-table/enums';
import { ChildAttributes } from 'ka-table/models';
import { DataChangeFunc, EventFunc, OptionChangeFunc } from 'ka-table/types';
import { EventsLog } from './EventsLog';

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

const childAttributes: ChildAttributes = {
  cell: {
    className: '123',
    onClick: (e, extendedEvent): any => {
      const { childProps: { dispatch } } = extendedEvent;
      dispatch('MY_CELL_onClick', { extendedEvent });
    },
    onContextMenu: (e, extendedEvent) => {
      extendedEvent.dispatch('MY_CELL_onContextMenu', { extendedEvent });
    },
    onDoubleClick: (e, extendedEvent) => {
      const { dispatch, childElementAttributes } = extendedEvent;
      dispatch('MY_CELL_onDoubleClick', { extendedEvent });
      childElementAttributes.onClick!(e);
    },
  },
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
  const onEvent: EventFunc = (type, eventData) => {
    changeEvents((prevValue) => ([{ type, data: eventData, date: new Date(), showData: false }, ...prevValue]));
  };
  return (
    <div className='events-demo'>
      <Table
        {...option}
        data={data}
        onOptionChange={onOptionChange}
        onDataChange={onDataChange}
        onEvent={onEvent}
        childAttributes={childAttributes}
      />
      <EventsLog events={events} showDataClick={(eventData: any) => {
        const newEvents = [...events];
        newEvents.find((e) => e.date === eventData.date).showData = true;
        changeEvents(newEvents);
      }}/>
    </div>
  );
};

export default EventsDemo;
