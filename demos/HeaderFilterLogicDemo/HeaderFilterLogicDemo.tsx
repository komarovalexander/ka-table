import { DataType, Table } from 'ka-table';
import { FilteringMode, SortDirection, SortingMode } from 'ka-table/enums';

import React from 'react';

const dataArray = [
    {
        id: 1,
        name: 'Mike Wazowski',
        score: 80,
        passed: true,
        nextTry: new Date(2021, 10, 8),
        departments: [{ name: 'Department A', id: 1 }, { name: 'Department B', id: 2 }]
    },
    {
        id: 2,
        name: 'Billi Bob',
        score: 55,
        passed: false,
        nextTry: new Date(2021, 10, 8),
        departments: [{ name: 'Department C', id: 3 }]
    },
    {
        id: 3,
        name: 'Tom Williams',
        score: 55,
        passed: false,
        nextTry: new Date(2021, 11, 8),
        departments: [{ name: 'Department A', id: 1 }]
    },
    {
        id: 4,
        name: 'Kurt Cobain',
        score: 75,
        passed: true,
        nextTry: new Date(2021, 12, 9)
    },
    {
        id: 5,
        name: 'Marshall Bruce',
        score: 77,
        passed: true,
        nextTry: new Date(2021, 11, 12)
    },
    {
        id: 6,
        name: 'Sunny Fox',
        score: 33,
        passed: false,
        nextTry: new Date(2021, 10, 9)
    },
];

const HeaderFilterLogicDemo = () => {
    return (
        <Table
            columns={[
                {
                    key: 'name',
                    title: 'Name',
                    dataType: DataType.String,
                    sortDirection: SortDirection.Descend
                },
                {
                    key: 'score',
                    isHeaderFilterSearchable: true,
                    headerFilterSearchValue: 33,
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
                {
                    key: 'departments',
                    dataType: DataType.Object,
                    title: 'Departments',
                    isHeaderFilterSearchable: true,
                    filter: (value: { name: string; id: number; }[], filterValues: string[]) => {
                        if (value == null){
                            return filterValues?.some(x => x === 'Department is unspecified');
                        }
                        return filterValues?.some(x => value?.some(v => v.name === x));
                    },
                    headerFilterSearch: (value, searchValue) => {
                        return value.toLowerCase().includes(searchValue.toLowerCase());
                    },
                    headerFilterListItems: ({ data }) => {
                        const departments = data?.reduce<{ name: string, id: number }[]>((acc, item) => [...acc, ...(item.departments || [])], []);
                        const departmentsList = departments?.filter((item: any, index) => {
                            return departments?.findIndex(i => i.id === item.id) === index;
                        }).map(x => x.name) || [];
                        departmentsList?.unshift('Department is unspecified');
                        return departmentsList;
                    }
                },
            ]}
            data={dataArray}
            sortingMode={SortingMode.Single}
            filteringMode={FilteringMode.HeaderFilter}
            format={({ column, value }) => {
                if (column.dataType === DataType.Date) {
                    return value && new Date(value).toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' });
                }
                if (column.key === 'departments') {
                    return value?.map((d: any) => d.name).join(', ');
                }
            }}
            rowKeyField={'id'}
            childComponents={{
                headerFilterPopupSearchInput: {
                    elementAttributes: ({ column }) => {
                        if (column.key === 'departments'){
                            return { placeholder: 'Search department..'};
                        }
                    }
                },
                headerFilterPopupRow: {
                    elementAttributes: ({ rowData, columns }) => {
                        if (rowData.value === 'Department is unspecified' && !rowData.isSelected && columns?.some(c => c.key === 'departments')){
                            return { style: { backgroundColor: '#DDD'}};
                        }
                    }
                },
                headerFilterPopupTextCell: {
                    elementAttributes: ({ rowData, column }) => {
                        if (column.key === 'departments_isSelected'){
                            return { style: { backgroundColor: rowData.isSelected ? '#00FF0033' : 'transparent'}};
                        }
                    },
                    content: ({ column, rowData }) => {
                        if (column.key === 'departments' && rowData.value !== 'Department is unspecified'){
                            return `(${rowData.value})`;
                        }
                        if (column.key === 'departments_isSelected'){
                            return<></>;
                        }
                    }
                },
            }}
        />
    );
};

export default HeaderFilterLogicDemo;
