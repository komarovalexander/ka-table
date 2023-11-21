import React from 'react';

import { DataType, Table } from '../../lib';
import { SortingMode } from '../../lib/enums';

const dataArray = Array(10000).fill(undefined).map(
    (_, index) => ({
        column1: `value:${index % 25}`,
        column2: `value:${index % 100}`,
        column3: `value:${index}`,
        column4: `value:${index}`,
        id: index,
    }),
);

const ManyRowsGroupingDemo: React.FC = () => {
    return (
        <Table
            columns= {[
                { key: 'column1', title: 'Column 1', dataType: DataType.String },
                { key: 'column2', title: 'Column 2', dataType: DataType.String },
                { key: 'column3', title: 'Column 3', dataType: DataType.String },
                { key: 'column4', title: 'Column 4', dataType: DataType.String },
            ]}
            data={dataArray}
            groups={[{ columnKey: 'column1'}, { columnKey: 'column2' }]}
            rowKeyField={'id'}
            sortingMode={SortingMode.Single}
            virtualScrolling= {{
                enabled: true
            }}
            childComponents={{
                tableWrapper: {
                    elementAttributes: () => ({ style: { maxHeight: 600 }})
                }
            }}
        />
    );
};

export default ManyRowsGroupingDemo;
