import { DataType, Table } from '../../lib';
import { FilteringMode, SortDirection, SortingMode } from '../../lib/enums';

import React from 'react';

const dataArray: any[] = [
    { id: 1, name: 'Mike Wazowski', score: 80, passed: true, nextTry: new Date(2021, 10, 8) },
    { id: 2, name: 'Billi Bob', score: 55, passed: false, nextTry: new Date(2021, 10, 8) },
    { id: 3, name: 'Tom Williams', score: 55, passed: false, nextTry: new Date(2021, 11, 8) },
    { id: 4, name: 'Kurt Cobain', score: 75, passed: true, nextTry: new Date(2021, 12, 9) },
    { id: 5, name: 'Marshall Bruce', score: 77, passed: true, nextTry: new Date(2021, 11, 12) },
    { id: 6, name: 'Sunny Fox', score: 33, passed: false, nextTry: new Date(2021, 10, 9) },
];

const HeaderFilterDemo: React.FC = () => {
    return (
        <Table
            columns= {[
                {
                    key: 'name',
                    title: 'Name', dataType: DataType.String, sortDirection: SortDirection.Descend,
                    isFilterable: false
                },
                {
                    key: 'score',
                    title: 'Score', dataType: DataType.Number
                },
                {
                    key: 'passed',
                    title: 'Passed',
                    dataType: DataType.Boolean
                },
                {
                    key: 'nextTry',
                    dataType: DataType.Date,
                    title: 'Next Try',
                },
            ]}
            data={dataArray}
            sortingMode={SortingMode.Single}
            filteringMode={FilteringMode.HeaderFilter}
            format= {({ column, value }) => {
                if (column.dataType === DataType.Date) {
                    return value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' });
                }
            }}
            rowKeyField={'id'}
        />
    );
};

export default HeaderFilterDemo;
