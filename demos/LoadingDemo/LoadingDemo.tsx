import React, { useState } from 'react';

import { DataType } from 'ka-table/enums';
import { Table } from 'ka-table';

const dataArray = Array(10)
    .fill(undefined)
    .map((_, index) => ({
        column1: `column:1 row:${index}`,
        column2: `column:2 row:${index}`,
        column3: `column:3 row:${index}`,
        column4: `column:4 row:${index}`,
        id: index,
    }));

const LoadingDemo = () => {
    const [loading, setLoading] = useState(true);

    return (
        <>
            <button
                onClick={(e) => {
                    setLoading(!loading);
                }}
                className='top-element'
            >
                {loading ? 'Hide Loading' : 'Show Loading'}
            </button>
            <Table
                columns={[
                    { key: 'column1', title: 'Column 1', dataType: DataType.String },
                    { key: 'column2', title: 'Column 2', dataType: DataType.String },
                    { key: 'column3', title: 'Column 3', dataType: DataType.String },
                    { key: 'column4', title: 'Column 4', dataType: DataType.String },
                ]}
                data={dataArray}
                loading={{
                    enabled: loading,
                    text: 'Loading data',
                }}
                rowKeyField='id'
            />
        </>
    );
};

export default LoadingDemo;
