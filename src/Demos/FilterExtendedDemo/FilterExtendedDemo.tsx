import React, { useState } from 'react';
import FilterControl from 'react-filter-control';
import { IFilterControlFilterValue } from 'react-filter-control/interfaces';

import { ITableOption, Table } from '../../lib';
import { DataType } from '../../lib/enums';
import { OptionChangeFunc } from '../../lib/types';
import { filterData } from './filterData';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 3, name: 'Tom Bruce', score: 67, passed: false },
  { id: 2, name: 'Billi Bob', score: 55, passed: false },
  { id: 3, name: 'Tom Parker', score: 45, passed: false },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Tom Williams', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false },
];

const tableOption: ITableOption = {
  columns: [
    { key: 'name', title: 'Name', dataType: DataType.String },
    { key: 'score', title: 'Score', dataType: DataType.Number },
    { key: 'passed', title: 'Passed', dataType: DataType.Boolean },
  ],
  rowKeyField: 'id',
};

export const fields = [{
  caption: 'Name',
  name: 'name',
  operators: [{
    caption: 'Contains',
    name: 'contains',
  }, {
    caption: 'Does not Contain',
    name: 'doesNotContain',
  }],
}, {
  caption: 'Score',
  name: 'score',
  operators: [{
    caption: 'Equals',
    name: '=',
  }, {
    caption: 'Does not Equal',
    name: '<>',
  }, {
    caption: 'More than',
    name: '>',
  }, {
    caption: 'Less than',
    name: '<',
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
    {
      field: 'score',
      key: '2',
      operator: '>',
      value: '66',
    },
  ],
};

const FilterExtendedDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChange: OptionChangeFunc = (value) => {
    changeOptions({...option, ...value });
  };
  const [filterValue, changeFilter] = useState(filter);
  const onFilterChangedChanged = (newFilterValue: IFilterControlFilterValue) => {
    changeFilter(newFilterValue);
  };
  const filteredData = filterData(dataArray, filterValue);
  return (
    <>
      <div className='top-element'>
        <FilterControl {...{fields, groups, filterValue,  onFilterValueChanged: onFilterChangedChanged}}/>
      </div>
      <Table
        {...option}
        data={filteredData}
        onOptionChange={onOptionChange}
      />
    </>
  );
};

export default FilterExtendedDemo;
