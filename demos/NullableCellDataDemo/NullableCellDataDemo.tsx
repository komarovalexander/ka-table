import { DataType, Table, useTableInstance } from 'ka-table';
import { EditingMode, FilteringMode, SortDirection, SortingMode } from 'ka-table/enums';
import React, { useState } from 'react';

import { IFilterRowEditorProps } from 'ka-table/props';
import dataArray from './data';
import { kaDateUtils } from 'ka-table/utils';

const CustomDateFilterEditor: React.FC<IFilterRowEditorProps> = ({
  column,
}) => {
  const fieldValue = column.filterRowValue;
  const value = fieldValue && kaDateUtils.getDateInputValue(fieldValue);
  const table = useTableInstance();
  return (
    <div>
      <>Less than: </>
      <input
        type='date'
        value={value || ''}
        onChange={(event) => {
          const targetValue = event.currentTarget.value;
          const filterRowValue = targetValue ? new Date(targetValue) : null;
          table.updateFilterRowValue(column.key, filterRowValue);
        }}
      />
    </div>
  );
};

const NullableCellDataDemo: React.FC = () => {
  const [searchText, setSearchText] = useState('i');
  return (
    <>
      <input type='search' value={searchText} onChange={(event) => {
        setSearchText(event.currentTarget.value);
      }} className='top-element'/>
      <Table
        columns= {[
          {
            dataType: DataType.String,
            key: 'representative.name',
            width: 150,
            title: 'Representative',
          },
          {
            dataType: DataType.Boolean,
            key: 'company.hasLoyalProgram',
            title: 'Loyal Program',
          },
          {
            dataType: DataType.String,
            filterRowValue: 'e',
            key: 'product.name',
            width: 110,
            title: 'Product',
          },
          {
            dataType: DataType.Number,
            key: 'product.price',
            sortDirection: SortDirection.Ascend,
            width: 110,
            style: {
              textAlign: 'right',
            },
            title: 'Product Price',
          },
          {
            dataType: DataType.Date,
            filterRowOperator: '<',
            filterRowValue: new Date(2015, 1, 2),
            key: 'firstDealDate',
            width: 190,
            style: {
              textAlign: 'center',
            },
            title: 'First Deal Date',
          },
        ]}
        data={dataArray}
        editingMode={EditingMode.Cell}
        format= {({ column, value }) => {
          if (column.key === 'company.hasLoyalProgram'){
            return `Loyal program: ${ value == null ? 'Unspecified' : (value ? 'Yes' : 'No')}`;
          }
          if (column.key === 'price'){
            return value == null ? '-' : `$${value}`;
          }
          if (column.dataType === DataType.Date){
            return value && value.toLocaleDateString('en', {month: '2-digit', day: '2-digit', year: 'numeric' });
          }
        }}
        filteringMode={FilteringMode.FilterRow}
        groups={[{ columnKey: 'company.hasLoyalProgram' }]}
        groupsExpanded={[[true]]}
        rowKeyField={'id'}
        searchText={searchText}
        sortingMode={SortingMode.Single}
        childComponents={{
          filterRowCell: {
            content: (props) => {
              switch (props.column.key){
                case 'firstDealDate': return <CustomDateFilterEditor {...props}/>;
              }
            }
          }
        }}
      />
    </>
  );
};

export default NullableCellDataDemo;
