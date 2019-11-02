import React, { useState } from 'react';
import FilterControl, { IFilterControlFilterValue } from 'react-filter-control';

import Table, { ITableOption } from '../../Components/Table/Table';
import { DataType } from '../../Enums/DataType';
import { SortDirection } from '../../Enums/SortDirection';
import { SortingMode } from '../../Enums/SortingMode';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { filterData } from './filterData';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false },
  { id: 3, name: 'Tom Williams', score: 45, passed: false },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Tom Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false },
];

const tableOption: ITableOption = {
  columns: [
    { field: 'name', title: 'Name', dataType: DataType.String, sortDirection: SortDirection.Descend },
    { field: 'score', title: 'Score', dataType: DataType.Number },
    { field: 'passed', title: 'Passed', dataType: DataType.Boolean },
  ],
  rowKey: 'id',
  sortingMode: SortingMode.Single,
};

export const fields = [{
  caption: 'Name',
  name: 'name',
  operators: [{
    caption: 'Contains',
    name: 'contains',
  }, {
    caption: 'Does not equal',
    name: '<>',
  }],
}, {
  caption: 'Score',
  name: 'score',
  operators: [{
    caption: 'Equals',
    name: '=',
  }],
}];

export const groups = [{
  caption: 'And',
  name: 'and',
}, {
  caption: 'Or',
  name: 'or',
}];
export const filter: IFilterControlFilterValue = {
  groupName: 'and',
  items: [
    {
      field: 'name',
      key: '1',
      operator: 'contains',
      value: 'Tom',
    },
  ],
};

const FilterExtendedDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChanged: OptionChangedFunc = (value) => {
    changeOptions({...option, ...value });
  };
  const [filterValue, changeFilter] = useState(filter);
  const onFilterChangedChanged = (newFilterValue: IFilterControlFilterValue) => {
    changeFilter(newFilterValue);
  };
  const filteredData = filterData(dataArray, filterValue);
  return (
    <>
      <FilterControl {...{fields, groups, filterValue,  onFilterValueChanged: onFilterChangedChanged}}/>
      <Table
        {...option}
        data={filteredData}
        onOptionChanged={onOptionChanged}
      />
    </>
  );
};

export default FilterExtendedDemo;