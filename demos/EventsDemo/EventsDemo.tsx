import './EventsDemo.scss';

import React, { useState } from 'react';

import { Table } from 'ka-table';
import { DataType, EditingMode, FilteringMode, SortingMode } from 'ka-table/enums';
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

const EventsDemo: React.FC = () => {
  const [events, changeEvents] = useState([] as any []);
  return (
    <div className='events-demo'>
      <Table
        columns={[
          { key: 'column1', title: 'Column 1', dataType: DataType.String },
          { key: 'column2', title: 'Column 2', dataType: DataType.String },
          { key: 'column3', title: 'Column 3', dataType: DataType.String },
          { key: 'column4', title: 'Column 4', dataType: DataType.String },
        ]}
        data={dataArray}
        editingMode={EditingMode.Cell}
        filteringMode={FilteringMode.FilterRow}
        height={300}
        rowKeyField='id'
        sortingMode={SortingMode.Single}
        uncontrolled={{
          onDispatch: (action: any) => {
            changeEvents((prevValue) => ([{ type: action.type, data: action, date: new Date(), showData: false }, ...prevValue]));
          },
        }}
        childComponents={{
          cell: {
            elementAttributes: () => ({
              className: 'my-cell-class',
              onClick: (e, extendedEvent) => {
                const { childProps: { dispatch } } = extendedEvent;
                dispatch({ type: 'MY_CELL_onClick', ...{ extendedEvent }});
              },
            })
          },
          cellText: {
            elementAttributes: () => ({
              className: 'my-cell-text-class',
              onClick: (e, extendedEvent) => {
                const { childProps: { dispatch } } = extendedEvent;
                dispatch({ type: 'MY_CELL_TEXT_onClick', ...{ extendedEvent }});
              },
              onContextMenu: (e, extendedEvent) => {
                extendedEvent.dispatch({ type: 'MY_CELL_onContextMenu', ...{ extendedEvent }});
              },
              onDoubleClick: (e, extendedEvent) => {
                const { dispatch, childElementAttributes } = extendedEvent;
                dispatch({ type: 'MY_CELL_TEXT_onDoubleClick', ...{ extendedEvent }});
                childElementAttributes.onClick!(e);
              },
            })
          },
          dataRow: {
            elementAttributes: () => ({
              onClick: (e, extendedEvent) => {
                const { childProps: { dispatch } } = extendedEvent;
                dispatch({ type: 'MY_ROW_onClick', ...{ extendedEvent }});
              }
            }),
          },
          table: {
            elementAttributes: () => ({
              onMouseEnter: (e, extendedEvent) => {
                const { dispatch } = extendedEvent;
                dispatch({ type: 'MY_TABLE_onMouseEnter', ...{ extendedEvent }});
              },
              onMouseLeave: (e, extendedEvent) => {
                const { dispatch } = extendedEvent;
                dispatch({ type: 'MY_TABLE_onMouseLeave', ...{ extendedEvent }});
              }
            }),
          },
        }}
      />
      <EventsLog
        events={events}
        showDataClick={(eventData: any) => {
          const newEvents = [...events];
          newEvents.find((e) => e.date === eventData.date).showData = true;
          changeEvents(newEvents);
        }}
        clearLog={() => changeEvents([])}/>
    </div >
  );
};

export default EventsDemo;
