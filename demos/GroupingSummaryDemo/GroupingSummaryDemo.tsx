import React from 'react';

import { DataType, Table } from 'ka-table';

const dataArray = [
    { id: 1, type: 'Cat', name: 'Kas', country: 'Czech Republic', age: 2 },
    { id: 2, type: 'Dog', name: 'Rex', country: 'Montenegro', age: 6 },
    { id: 3, type: 'Cat', name: 'Simba', country: 'France', age: 12 },
    { id: 4, type: 'Dog', name: 'Beethoven', country: 'Czech Republic', age: 3 },
    { id: 5, type: 'Cat', name: 'Hash', country: 'Czech Republic', age: 8 },
];

const GroupingSummaryDemo: React.FC = () => {
    return (
        <Table
            columns= {[
                { key: 'type', title: 'TYPE', dataType: DataType.String },
                { key: 'name', title: 'NAME', dataType: DataType.String },
                { key: 'country', title: 'COUNTRY', dataType: DataType.String },
                { key: 'age', title: 'AGE', dataType: DataType.Number, width: '50%' },
            ]}
            data={dataArray}
            groups={[{ columnKey: 'country', enableSummary: false }, { columnKey: 'type', enableSummary: true }]}
            rowKeyField={'id'}
            childComponents={{
                groupSummaryCell: {
                    content: ({ groupData, column }) => {
                        switch (column.key) {
                        case 'age': return (
                            <b>Max age: {Math.max.apply(Math, groupData.map((o) => o.age))}</b>
                        );
                        }
                    }
                }
            }}
        />
    );
};

export default GroupingSummaryDemo;
