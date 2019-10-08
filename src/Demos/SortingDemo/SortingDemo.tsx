import React, { useState } from 'react';

import Table, { ITableOption } from '../../Components/Table/Table';
import { DataType } from '../../Enums/DataType';
import { SortDirection } from '../../Enums/SortDirection';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';

const dataArray: any[] = [];

for (let index = 0; index < 10; index++) {
  dataArray.push({ column: index + '1', column2: index + '2', id: index });
}

const tableOption: ITableOption = {
  columns: [
    { field: 'id', title: 'Id', dataType: DataType.String },
    { field: 'column', title: 'Column 1', dataType: DataType.String, sortDirection: SortDirection.Descend },
    { field: 'column2', title: 'Column 2', dataType: DataType.String },
  ],
  rowKey: 'id',
};

const SortingDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChanged: OptionChangedFunc = (value) => {
    changeOptions({...option, ...value });
  };
  return (
    <Table
      {...option}
      data={dataArray}
      onOptionChanged={onOptionChanged}
    />
  );
};

export default SortingDemo;
