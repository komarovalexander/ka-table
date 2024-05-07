import { DataType, Table } from '../../lib';
import { EditingMode, SortingMode } from '../../lib/enums';

import { Column } from '../../lib/models';
import React from 'react';

const columns: Column[] = Array(100).fill(undefined).map(
    (_, index) => ({
        key: 'column' + index,
        width: 190,
        title: 'Column ' + index,
        type: DataType.String,
    }),
);

const dataArray = Array(30).fill(undefined).map(
    (_, index) => columns.reduce((previousValue: any, currentValue) => {
        previousValue[currentValue.key] = `${currentValue.key} row:${index}`;
        return previousValue;
    }, { id: index }),
);

const ManyColumnsDemo = () => {
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

export default ManyColumnsDemo;
