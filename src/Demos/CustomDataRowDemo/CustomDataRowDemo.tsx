import { DataType, Table } from '../../lib';
import { SortDirection, SortingMode } from '../../lib/enums';

import React from 'react';
import defaultOptions from '../../lib/defaultOptions';

const dataArray = [
    { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
    { id: 2, name: 'Billi Bob', score: 55, passed: false },
    { id: 3, name: 'Tom Williams', score: 45, passed: false },
    { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
    { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
    { id: 6, name: 'Sunny Fox', score: 33, passed: false },
];

const CustomDataRowDemo = () => {
    return (
        <Table
            columns= {[
                {
                    dataType: DataType.String,
                    key: 'name',
                    sortDirection: SortDirection.Descend,
                    width: 150,
                    title: 'Student',
                },
                { key: 'score', title: 'Score', dataType: DataType.Number },
            ]}
            data={dataArray}
            rowKeyField={'id'}
            sortingMode={SortingMode.Single}
            oddEvenRows={true}
            childComponents={{
                dataRow: {
                    content: ({rowData, columns}) => {
                        return (
                            <td className={defaultOptions.css.cell} colSpan={columns.length}>
                                <div>
                                    {rowData.name}: {rowData.score} ({rowData.passed ? 'Passed' : 'Failed'})
                                </div>
                            </td>
                        );
                    }
                }
            }}
        />
    );
};

export default CustomDataRowDemo;
