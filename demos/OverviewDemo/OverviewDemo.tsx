import './OverviewDemo.scss';

import React, { useState } from 'react';

import { ITableOption, Table } from 'ka-table';
import { DataType, EditingMode, FilteringMode, SortDirection, SortingMode } from 'ka-table/enums';
import { DataChangeFunc, OptionChangeFunc } from 'ka-table/types';
import dataArray from './data';
import { CustomDateFilterEditor, CustomImageCell, CustomNumberFilterEditor } from './Editors';

const tableOption: ITableOption = {
  columns: [
    {
      cell: CustomImageCell,
      dataType: DataType.String,
      field: 'image',
      fieldParents: ['representative'],
      filterRowCell: () => <></>,
      key: 'representative.image',
      style: { width: '20px' },
    },
    {
      dataType: DataType.String,
      field: 'name',
      fieldParents: ['representative'],
      key: 'representative.name',
      style: { width: '120px' },
      title: 'Representative',
    },
    {
      dataType: DataType.Boolean,
      fieldParents: ['company'],
      format: (value) => `Loyal program: ${ value ? 'Yes' : 'No'}`,
      key: 'hasLoyalProgram',
      sortDirection: SortDirection.Ascend,
      title: 'Loyal Program',
    },
    {
      dataType: DataType.String,
      field: 'name',
      fieldParents: ['company'],
      key: 'company.name',
      style: {
        width: '130px',
      },
      title: 'Company Name',
    },
    {
      dataType: DataType.String,
      field: 'name',
      fieldParents: ['product'],
      key: 'product.name',
      style: {
        width: '80px',
      },
      title: 'Product',
    },
    {
      dataType: DataType.Number,
      field: 'price',
      fieldParents: ['product'],
      filterRowCell: CustomNumberFilterEditor,
      filterRowOperator: '>',
      filterRowValue: 4000,
      format: (value: number) => {
        return `$${value}`;
      },
      key: 'product.price',
      style: {
        textAlign: 'right',
        width: '95px',
      },
      title: 'Product Price',
      validation: (value) => {
        if (value < 0) {
          return 'value can\'t be less than 0';
        }
        if (!value && value !== 0) {
          return 'value can\'t be undefined';
        }
      },
    },
    {
      dataType: DataType.Date,
      field: 'firstDealDate',
      filterRowCell: CustomDateFilterEditor,
      filterRowOperator: '>=',
      filterRowValue: new Date(2015, 1, 25),
      format: (value: Date) => value.toLocaleDateString('en', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      key: 'firstDealDate1',
      style: {
        textAlign: 'center',
        width: '165px',
      },
      title: 'First Deal Date',
    },
  ],
  editingMode: EditingMode.Cell,
  filteringMode: FilteringMode.FilterRow,
  groups: [{ columnKey: 'hasLoyalProgram' }],
  groupsExpanded: [[true]],
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const OverviewDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChange: OptionChangeFunc = (value) => {
    changeOptions({...option, ...value });
  };

  const [data, changeData] = useState(dataArray);
  const onDataChange: DataChangeFunc = (newValue) => {
    changeData(newValue);
  };
  return (
    <>
      <div className='overview-search-container'>
        <input type='search' defaultValue={option.search} onChange={(event) => {
          onOptionChange({ search: event.currentTarget.value });
        }} placeholder='type to search by data..' className='overview-search'/>
      </div>
      <Table
        {...option}
        data={data}
        childAttributes={{table: {className: 'overview-table'}}}
        onOptionChange={onOptionChange}
        onDataChange={onDataChange}
      />
    </>
  );
};

export default OverviewDemo;
