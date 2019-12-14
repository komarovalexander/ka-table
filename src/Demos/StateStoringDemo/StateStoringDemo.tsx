import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType, EditingMode, SortingMode } from '../../lib/enums';
import { DataChangeFunc, OptionChangeFunc } from '../../lib/types';
import dataStorage from './dataStorage';

const defaultOption = {
  columns: [
    { key: 'type', title: 'TYPE', dataType: DataType.String },
    { key: 'name', title: 'NAME', dataType: DataType.String },
    { key: 'country', title: 'COUNTRY', dataType: DataType.String },
    { key: 'age', title: 'AGE', dataType: DataType.Number, style: { width: '50%' } },
  ],
  editingMode: EditingMode.Cell,
  filterRow: [],
  groups: [{ columnKey: 'country' }, { columnKey: 'type' }],
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const OPTION_KEY = 'state-storing-demo-table-option';
const tableOption: ITableOption = {...defaultOption, ...JSON.parse(localStorage.getItem(OPTION_KEY) || '0')};

const StateStoringDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChange: OptionChangeFunc = (value) => {
    const newOption = {...option, ...value };
    changeOptions({...option, ...value });

    localStorage.setItem(OPTION_KEY, JSON.stringify(newOption));
  };

  const [data, changeData] = useState(dataStorage.get());
  const onDataChange: DataChangeFunc = async (newValue) => {
    changeData(newValue);

    dataStorage.save(newValue);
  };

  return (
    <>
      <button onClick={() => window.location.reload()} className='top-element' >Reload Page</button>
      <Table
        {...option}
        data={data}
        onOptionChange={onOptionChange}
        onDataChange={onDataChange}
      />
    </>
  );
};

export default StateStoringDemo;
