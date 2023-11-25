import { ActionType, SortDirection, SortingMode } from 'ka-table/enums';
import { DataType, Table, useTable } from 'ka-table';
import React, { useState } from 'react';

const JsonDemo = () => {
    const [data, setData] = useState();
    const table = useTable({
        onDispatch: async (action) => {
            if (action.type === ActionType.ComponentDidMount) {
                table.showLoading();
                const response = await fetch('https://komarovalexander.github.io/ka-table/data/employees.json');
                const jsonData = await response.json();
                setData(jsonData);
                table.hideLoading();
            }
        }
    });

    return (
        <div className='remote-data-demo'>
            <Table
                table={table}
                data={data}
                columns= {[
                    { key: 'name', title: 'Name', dataType: DataType.String },
                    { key: 'score', title: 'Score', dataType: DataType.Number, sortDirection: SortDirection.Ascend },
                    { key: 'passed', title: 'Passed', dataType: DataType.Boolean },
                ]}
                sortingMode={SortingMode.Single}
                rowKeyField={'id'}
            />
        </div>
    );
};

export default JsonDemo;
