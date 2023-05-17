import './SelectionDemo.scss';

import { DataType, FilteringMode, SortingMode } from 'ka-table/enums';
import { Table, useTableInstance } from 'ka-table';

import { ICellTextProps } from 'ka-table/props';
import React from 'react';
import { kaPropsUtils } from 'ka-table/utils';

const dataArray = Array(64)
  .fill(undefined)
  .map((_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }));

const SelectionCell: React.FC<ICellTextProps> = ({ rowKeyValue, isSelectedRow, selectedRows }) => {
  const table = useTableInstance();
  return (
    <input
      type='checkbox'
      checked={isSelectedRow}
      onChange={(event: any) => {
        if (event.nativeEvent.shiftKey) {
          table.selectRowsRange(rowKeyValue, [...selectedRows].pop());
        } else if (event.currentTarget.checked) {
          table.selectRow(rowKeyValue);
        } else {
          table.deselectRow(rowKeyValue);
        }
      }}
    />
  );
};

const SelectionHeader = () => {
  const table = useTableInstance();
  const areAllRowsSelected = kaPropsUtils.areAllFilteredRowsSelected(table.props);

  return (
    <input
      type='checkbox'
      checked={areAllRowsSelected}
      onChange={(event) => {
        if (event.currentTarget.checked) {
          table.selectAllFilteredRows(); // also available: selectAllVisibleRows(), selectAllRows()
        } else {
          table.deselectAllFilteredRows(); // also available: deselectAllVisibleRows(), deselectAllRows()
        }
      }}
    />
  );
};

const SelectionDemo: React.FC = () => {
  return (
    <div className='selection-demo'>
      <Table
        columns={[
          {
            key: 'selection-cell',
            isFilterable: false,
          },
          { key: 'column1', title: 'Column 1', dataType: DataType.String },
          { key: 'column2', title: 'Column 2', dataType: DataType.String },
          { key: 'column3', title: 'Column 3', dataType: DataType.String },
          { key: 'column4', title: 'Column 4', dataType: DataType.String },
        ]}
        paging={{
          enabled: true,
        }}
        data={dataArray}
        rowKeyField={'id'}
        selectedRows={[3, 5]}
        sortingMode={SortingMode.Single}
        filteringMode={FilteringMode.FilterRow}
        childComponents={{
          cellText: {
            content: (props) => {
              if (props.column.key === 'selection-cell') {
                return <SelectionCell {...props} />;
              }
            },
          },
          headCell: {
            content: (props) => {
              if (props.column.key === 'selection-cell') {
                return <SelectionHeader />;
              }
            },
          },
        }}
      />
    </div>
  );
};

export default SelectionDemo;
