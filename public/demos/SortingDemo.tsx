import React, { useState } from 'react';

import Table, { ITableOption } from '../../Components/Table/Table';
import { SortDirection } from '../../Enums/SortDirection';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';

const dataArray: any[] = [];

for (let index = 0; index < 10; index++) {
  dataArray.push({ column: index + '1', column2: index + '2', id: index });
}

const tableOption: ITableOption = {
  columns: [
    { field: 'id', title: 'Id' },
    { field: 'column', title: 'Column 1', sortDirection: SortDirection.Descend },
    { field: 'column2', title: 'Column 2' },
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