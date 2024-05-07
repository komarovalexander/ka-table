import './DeleteRowDemo.scss';

import { DataType, Table } from '../../lib';

import { ICellTextProps } from '../../lib/props';
import React from 'react';
import { deleteRow } from '../../lib/actionCreators';

const dataArray = Array(10).fill(undefined).map(
    (_, index) => ({
        column1: `column:1 row:${index}`,
        column2: `column:2 row:${index}`,
        column3: `column:3 row:${index}`,
        column4: `column:4 row:${index}`,
        id: index,
    }),
);

const DeleteRow = ({
    dispatch, rowKeyValue,
}: ICellTextProps) => {
    return (
        <img
            src='static/icons/delete.svg'
            className='delete-row-column-button'
            onClick={() => dispatch(deleteRow(rowKeyValue))}
            alt=''
        />
    );
};

const DeleteRowDemo = () => {
    return (
        <Table
            columns= {[
                { key: 'column1-1', field: 'column1', title: 'Column 1', dataType: DataType.String },
                { key: 'column1-2', field: 'column1', title: 'Column 1', dataType: DataType.String },
                { key: 'column2', title: 'Column 2', dataType: DataType.String },
                { key: 'column3', title: 'Column 3', dataType: DataType.String },
                { key: 'column4', title: 'Column 4', dataType: DataType.String },
                { key: ':delete', width: 70, style: { textAlign: 'center' } },
            ]}
            data={dataArray}
            rowKeyField={'id'}
            childComponents={{
                cellText: {
                    content: (props) => {
                        switch (props.column.key){
                        case ':delete': return <DeleteRow {...props}/>;
                        }
                    }
                }
            }}
        />
    );
};

export default DeleteRowDemo;
