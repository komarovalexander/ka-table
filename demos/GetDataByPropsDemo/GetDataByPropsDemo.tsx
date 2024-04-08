import './GetDataByPropsDemo.scss';

import { DataType, EditingMode, FilteringMode, SortDirection, SortingMode } from 'ka-table/enums';
import React, { useState } from 'react';
import { Table, useTable } from 'ka-table';

import { kaPropsUtils } from 'ka-table/utils';

const dataArray = [
    { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
    { id: 2, name: 'Billi Bob', score: 55, passed: false, nextTry: new Date(2019, 10, 8, 10) },
    { id: 3, name: 'Tom Williams', score: 45, passed: false, nextTry: new Date(2019, 11, 8, 10) },
    { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
    { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
    { id: 6, name: 'Sunny Fox', score: 33, passed: false, nextTry: new Date(2019, 10, 9, 10) },
];


const GetDataByPropsDemo = () => {
    const [printData, setPrintData] = useState<any[]>();
    const [searchText, setSearchText] = useState<string>();
    const table = useTable();

    return (
        <div className='obtain-table-data-demo'>
            <input type='search' value={searchText} onChange={(event) => {
                setSearchText(event.currentTarget.value);
            }} className='top-element'/>
            <Table
                table={table}
                columns={[
                    { dataType: DataType.String, key: 'name', title: 'Name', sortDirection: SortDirection.Ascend },
                    { key: 'score', title: 'Score', dataType: DataType.Number },
                    {
                        dataType: DataType.Boolean,
                        key: 'passed',
                        title: 'Passed',
                    },
                    {
                        dataType: DataType.Date,
                        key: 'nextTry',
                        title: 'Next Try',
                    },
                ]}
                data={dataArray}
                searchText={searchText}
                editingMode={EditingMode.Cell}
                format={({ column, value }) => {
                    if (column.dataType === DataType.Date){
                        return value && value.toLocaleDateString('en', {month: '2-digit', day: '2-digit', year: 'numeric' });
                    }
                }}
                rowKeyField={'id'}
                filteringMode={FilteringMode.FilterRow}
                sortingMode={SortingMode.Single}
            />
            <div className='table-data'>
                <h4>Table Data:</h4>
                <button onClick={() => {
                    setPrintData(kaPropsUtils.getData(table.props));
                }}>Update</button>
                <pre className='data'>{JSON.stringify(printData, null, 2)}</pre>
            </div>
        </div>
    );
};

export default GetDataByPropsDemo;
