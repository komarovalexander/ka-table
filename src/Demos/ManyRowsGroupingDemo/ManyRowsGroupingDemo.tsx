import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType, SortingMode } from '../../lib/enums';
import { kaReducer } from '../../lib/reducers';
import { DispatchFunc } from '../../lib/types';

const dataArray = Array(10000).fill(undefined).map(
  (_, index) => ({
    column1: `value:${index % 25}`,
    column2: `value:${index % 100}`,
    column3: `value:${index}`,
    column4: `value:${index}`,
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
  data: dataArray,
  groups: [{ columnKey: 'column1'}, { columnKey: 'column2' }],
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
  virtualScrolling: {
  },
};

const ManyRowsGroupingDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const dispatch: DispatchFunc = (action) => {
    changeOptions((prevState: ITableOption) => kaReducer(prevState, action));
  };

  return (
    <>
      <Table
        {...option}
        data={dataArray}
        dispatch={dispatch}
      />
    </>
  );
};

export default ManyRowsGroupingDemo;
