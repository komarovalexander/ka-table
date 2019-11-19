import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType } from '../../lib/enums';
import { OptionChangedFunc } from '../../lib/types';

const dataArray = Array(100).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
  }),
);

const tableOption: ITableOption = {
  columns: [
    { field: 'column1', title: 'Column 1', dataType: DataType.String },
    { field: 'column2', title: 'Column 2', dataType: DataType.String },
    { field: 'column3', title: 'Column 3', dataType: DataType.String },
    { field: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  rowKey: 'column1',
};

const CommandColumnDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChanged: OptionChangedFunc = (value) => {
    changeOptions({...option, ...value });
  };

  const [data, changeData] = useState(dataArray);
  const onDataChanged: OptionChangedFunc = (newValue) => {
    changeData(newValue);
  };
  return (
    <Table
      {...option}
      data={data}
      onOptionChanged={onOptionChanged}
      onDataChanged={onDataChanged}
    />
  );
};

export default CommandColumnDemo;
