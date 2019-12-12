import React, { useState } from 'react';

import { ITableOption, Table } from 'ka-table';
import { DataType, SortingMode } from 'ka-table/enums';
import { OptionChangedFunc } from 'ka-table/types';

const dataArray = Array(10000).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index % 100}00`,
    column2: `column:2 row:${index % 50}0`,
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
  groups: [{ columnKey: 'column1'}, { columnKey: 'column2' }],
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
  virtualScrolling: {
  },
};

const ManyRowsGroupingDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChanged: OptionChangedFunc = (value) => {
    changeOptions({...option, ...value });
  };

  return (
    <>
      <Table
        {...option}
        data={dataArray}
        onOptionChanged={onOptionChanged}
      />
    </>
  );
};

export default ManyRowsGroupingDemo;
