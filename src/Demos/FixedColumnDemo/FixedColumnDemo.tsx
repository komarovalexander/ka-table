import { DataType, Table } from '../../lib';
import { EditingMode, SortingMode } from '../../lib/enums';

import { Column } from '../../lib/models';
import React from 'react';

const columns: Column[] = Array(20).fill(undefined).map(
    (_, index) => ({
        key: 'column' + index,
        width: 150,
        title: 'Column ' + index,
        type: DataType.String,
        // the first column sticks to the left edge, the last one to the right edge
        fixed: index === 0 ? 'left' : index === 19 ? 'right' : undefined,
    }),
);

const dataArray = Array(30).fill(undefined).map(
    (_, index) => columns.reduce<Record<string, string | number>>((previousValue, currentValue) => {
        previousValue[currentValue.key] = `${currentValue.key} row:${index}`;
        return previousValue;
    }, { id: index }),
);

const FixedColumnDemo = () => {
    return (
        <Table
            columns={columns}
            data={dataArray}
            editingMode={EditingMode.Cell}
            rowKeyField={'id'}
            sortingMode={SortingMode.Single}
        />
    );
};

export default FixedColumnDemo;
