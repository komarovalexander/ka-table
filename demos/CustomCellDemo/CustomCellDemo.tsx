import './CustomCellDemo.scss';

import { DataType, Table, useTableInstance } from 'ka-table';

import { EditingMode } from 'ka-table/enums';
import { ICellTextProps } from 'ka-table/props';
import React from 'react';
import dataArray from './data';

const CustomCell = ({
    column,
    rowKeyValue,
    value,
}: ICellTextProps) => {
    const table = useTableInstance();
    return (
        <div onClick={() => {
            table.openEditor(rowKeyValue, column.key);
        }} className={value ? 'custom-cell-demo-loyal' : 'custom-cell-demo-no-loyal'}>
            {value ? 'Loyal Program Member' : 'No Loyal Programm'}
        </div>
    );
};

const CustomCellDemo = () => {
    return (
        <Table
            columns= {[
                {
                    dataType: DataType.String,
                    key: 'representative.name',
                    width: 210,
                    title: 'Representative',
                },
                {
                    dataType: DataType.Boolean,
                    key: 'company.hasLoyalProgram',
                    style: { textAlign: 'center' },
                    width: 200,
                    title: 'Loyal Program',
                },
                {
                    dataType: DataType.String,
                    key: 'product.name',
                    width: 110,
                    title: 'Product',
                },
                {
                    dataType: DataType.Number,
                    key: 'product.price',
                    style: { textAlign: 'right' },
                    width: 130,
                    title: 'Price',
                },
                {
                    dataType: DataType.Date,
                    key: 'firstDealDate',
                    width: 150,
                    title: 'First Deal Date',
                },
            ]}
            format= {({ column, value }) => {
                if (column.key === 'product.price'){
                    return `$${value}`;
                }
                if (column.dataType === DataType.Date){
                    return value && new Date(value).toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' });
                }
            }}
            data={dataArray}
            editingMode={EditingMode.Cell}
            rowKeyField={'id'}
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
