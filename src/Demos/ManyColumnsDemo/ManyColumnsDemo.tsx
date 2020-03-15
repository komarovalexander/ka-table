import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType, EditingMode, SortingMode } from '../../lib/enums';
import { Column } from '../../lib/models';
import { kaReducer } from '../../lib/reducers';
import { DispatchFunc } from '../../lib/types';

const columns: Column[] = Array(100).fill(undefined).map(
  (_, index) => ({
    key: 'column' + index,
    style: { width: 150 },
    title: 'Column ' + index,
    type: DataType.String,
  }),
);

const dataArray = Array(30).fill(undefined).map(
  (_, index) => columns.reduce((previousValue: any, currentValue) => {
    previousValue[currentValue.key] = `${currentValue.key} row:${index}`;
    return previousValue;
  }, { id: index }),
);

const tableOption: ITableOption = {
  columns,
  data: dataArray,
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const ManyColumnsDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const dispatch: DispatchFunc = (action) => {
    changeOptions((prevState: ITableOption) => kaReducer(prevState, action));
  };

  return (
    <>
      <Table
        {...option}
        dispatch={dispatch}
      />
    </>
  );
};

export default ManyColumnsDemo;
