import React, { useState } from 'react';

import Table, { ITableOption } from '../../Components/Table/Table';
import { EditingMode } from '../../Enums/EditingMode';
import { SortDirection } from '../../Enums/SortDirection';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';

const dataArray: any[] = [];

for (let index = 0; index < 10; index++) {
  dataArray.push({ column: index + '1', column2: index + 2, id: index });
}

const tableOption: ITableOption = {
  columns: [
    { field: 'column', title: 'Column 1', sortDirection: SortDirection.Descend },
    { field: 'column2', title: 'Column 2' },
  ],
  editableCells: [{
    field: 'id',
    rowKeyValue: 2,
  }],
  editingMode: EditingMode.Cell,
  rowKey: 'id',
};

const EditingDemo: React.FC = () => {
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

export default EditingDemo;
