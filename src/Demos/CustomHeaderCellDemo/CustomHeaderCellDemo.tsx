import React from 'react';

import { Table } from '../../lib';
import { IHeadCellProps } from '../../lib/props';

const dataArray = Array(7).fill(undefined).map(
    (_, index) => ({
        column1: `column:1 row:${index}`,
        column2: `column:2 row:${index}`,
        id: index,
    }),
);

const HeadCell: React.FC<IHeadCellProps> = ({
    column: { title },
}) => {
    return (
        <div style={{color: 'red'}}>
            {title} - (Custom)
        </div>
    );
};

const CustomHeaderCellDemo: React.FC = () => {
    return (
        <Table
            columns= {[
                {
                    key: 'column1',
                    style: { textAlign: 'left' },
                    title: 'Column 1',
                },
                {
                    key: 'column2',
                    title: 'Column 2',
                },
            ]}
            data={dataArray}
            rowKeyField={'id'}
            childComponents={{
                headCell: {
                    content: (props) => {
                        if (props.column.key === 'column1'){
                            return <HeadCell {...props}/>;
                        }
                    }
                }
            }}
        />
    );
};

export default CustomHeaderCellDemo;
