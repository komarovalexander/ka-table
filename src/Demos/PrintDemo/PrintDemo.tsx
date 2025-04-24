import './PrintDemo.scss';

import { DataType, Table } from '../../lib';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const dataArray = Array(180).fill(undefined).map(
    (_, index) => ({
        column1: `column:1 row:${index}`,
        column2: `column:2 row:${index}`,
        column3: `column:3 row:${index}`,
        column4: `column:4 row:${index}`,
        id: index,
    }),
);

const PrintDemo = () => {
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef })


    return (
        <div className='print-demo'>
            <button onClick={() => reactToPrintFn()}>Click to Print</button>
            <div ref={contentRef} className='print-content'>
                <Table
                    columns= {[
                        { key: 'column1', title: 'Column 1', dataType: DataType.String },
                        { key: 'column2', title: 'Column 2', dataType: DataType.String },
                        { key: 'column3', title: 'Column 3', dataType: DataType.String },
                        { key: 'column4', title: 'Column 4', dataType: DataType.String },
                    ]}
                    data={dataArray}
                    rowKeyField={'id'}
                />
            </div>
        </div>
    );
};

export default PrintDemo;
