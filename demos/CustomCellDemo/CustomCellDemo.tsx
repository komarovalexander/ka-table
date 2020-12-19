import './CustomCellDemo.scss';

import React from 'react';

import { Table } from 'ka-table';
import { openEditor } from 'ka-table/actionCreators';
import { DataType } from 'ka-table/enums';
import { ICellTextProps } from 'ka-table/props';
import dataArray from './data';

const CustomCell: React.FC<ICellTextProps> = ({
  column,
  dispatch,
  rowKeyValue,
  value,
}) => {
  return (
    <div onClick={() => {
      dispatch(openEditor(rowKeyValue, column.key));
    }} className={value ? 'custom-cell-demo-loyal' : 'custom-cell-demo-no-loyal'}>
      {value ? 'Loyal Program Member' : 'No Loyal Programm'}
    </div>
  );
};

const CustomCellDemo: React.FC = () => {
  return (
    <Table
      columns={[
        {
          dataType: DataType.String,
          key: 'representative.name',
          style: { width: '200px' },
          title: 'Representative',
        },
        {
          dataType: DataType.Boolean,
          key: 'company.hasLoyalProgram',
          style: { width: '170px', textAlign: 'center' },
          title: 'Loyal Program',
        },
        {
          dataType: DataType.String,
          key: 'product.name',
          style: {
            width: '80px',
          },
          title: 'Product',
        },
        {
          dataType: DataType.Number,
          key: 'product.price',
          style: { width: '100px', textAlign: 'right' },
          title: 'Price',
        },
        {
          dataType: DataType.Date,
          key: 'firstDealDate',
          style: { width: '150px' },
          title: 'First Deal Date',
        },
      ]}
      data={dataArray}
      rowKeyField='id'
      format={({ column, value }) => {
        if (column.key === 'product.price'){
          return `$${value}`;
        }
        if (column.dataType === DataType.Date){
          return value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' });
        }
      }}
      childComponents={{
        cellText: {
          content: (props) => {
            switch (props.column.key){
              case 'company.hasLoyalProgram': return <CustomCell {...props}/>;
            }
          }
        }
      }}
    />
  );
};

export default CustomCellDemo;
