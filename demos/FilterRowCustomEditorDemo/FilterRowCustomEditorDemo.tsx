import { DataType, Table } from 'ka-table';
import { EditingMode, FilteringMode } from 'ka-table/enums';
import { updateFilterRowOperator, updateFilterRowValue } from 'ka-table/actionCreators';

import { Column } from 'ka-table/models';
import { DispatchFunc } from 'ka-table/types';
import { IFilterRowEditorProps } from 'ka-table/props';
import React from 'react';
import { kaDateUtils } from 'ka-table/utils';

const dataArray = [
    { id: 1, name: 'Mike Wazowski', score: 80, passed: true, nextTry: new Date(2021, 10, 9) },
    { id: 2, name: 'Billi Bob', score: 55, passed: false, nextTry: new Date(2021, 12, 9) },
    { id: 3, name: 'Tom Williams', score: 45, passed: false, nextTry: new Date(2021, 7, 9) },
    { id: 4, name: 'Kurt Cobain', score: 75, passed: true, nextTry: new Date(2021, 10, 12) },
    { id: 5, name: 'Marshall Bruce', score: 77, passed: true, nextTry: new Date(2021, 10, 15) },
    { id: 6, name: 'Sunny Fox', score: 33, passed: false, nextTry: new Date(2021, 10, 7) },
    { id: 7, name: 'Alex Brzowsky', score: 48, passed: false, nextTry: new Date(2021, 11, 11) },
];

const CustomLookupEditor = ({
    column, dispatch,
}: IFilterRowEditorProps) => {
    const toNullableBoolean = (value: any) => {
        switch (value) {
        case 'true': return true;
        case 'false': return false;
        }
        return value;
    };
    return (
        <div>
            <select
                className='form-control'
                defaultValue={column.filterRowValue}
                onChange={(event) => {
                    dispatch(updateFilterRowValue(column.key, toNullableBoolean(event.currentTarget.value)));
                }}>
                <option value=''/>
                <option value={'true'}>True</option>
                <option value={'false'}>False</option>
            </select>
        </div >
    );
};

const FilterOperators  = ({
    column, dispatch,
}: { column: Column; dispatch: DispatchFunc }) => {
    return (
        <select
            className='form-control'
            defaultValue={column.filterRowOperator}
            onChange={(event) => {
                dispatch(updateFilterRowOperator(column.key, event.currentTarget.value));
            }}>
            <option value={'='}>=</option>
            <option value={'<'}>{'<'}</option>
            <option value={'>'}>{'>'}</option>
            <option value={'<='}>{'<='}</option>
            <option value={'>='}>{'>='}</option>
        </select>
    );
};

const NumberEditor = ({
    column, dispatch,
}: IFilterRowEditorProps) => {
    return (
        <div>
            <FilterOperators column={column} dispatch={dispatch}/>
            <input
                defaultValue={column.filterRowValue}
                style={{width: 60}}
                onChange={(event) => {
                    const filterRowValue = event.currentTarget.value !== '' ? Number(event.currentTarget.value) : null;
                    dispatch(updateFilterRowValue(column.key, filterRowValue));
                }}
                type='number'
            />
        </div>
    );
};

const DateEditor = ({
    column, dispatch,
}: IFilterRowEditorProps) => {
    const fieldValue = column.filterRowValue;
    const value = fieldValue && kaDateUtils.getDateInputValue(fieldValue);
    return (
        <div>
            <FilterOperators column={column} dispatch={dispatch}/>
            <input
                type='date'
                value={value || ''}
                onChange={(event) => {
                    const targetValue = event.currentTarget.value;
                    const filterRowValue = targetValue ? new Date(targetValue) : null;
                    dispatch(updateFilterRowValue(column.key, filterRowValue));
                }}
            />
        </div>
    );
};

const FilterRowCustomEditorDemo = () => {
    return (
        <Table
            columns= {[
                {
                    dataType: DataType.Boolean,
                    filterRowValue: false,
                    key: 'passed',
                    style: {width: 90},
                    title: 'Passed',
                },
                {
                    dataType: DataType.String,
                    key: 'name',
                    style: {width: 100},
                    title: 'Name',
                },
                {
                    dataType: DataType.Number,
                    filterRowOperator: '>=',
                    filterRowValue: 45,
                    key: 'score',
                    style: {width: 120},
                    title: 'Score',
                },
                {
                    dataType: DataType.Date,
                    filterRowOperator: '<=',
                    filterRowValue: new Date(2021, 11, 11),
                    key: 'nextTry',
                    style: {width: 220},
                    title: 'Next Try',
                },
            ]}
            data={dataArray}
            editingMode={EditingMode.Cell}
            format= {({ column, value }) => {
                if (column.dataType === DataType.Date){
                    return value && value.toLocaleDateString('en', {month: '2-digit', day: '2-digit', year: 'numeric' });
                }
            }}
            filteringMode= {FilteringMode.FilterRow}
            rowKeyField={'id'}
            childComponents={{
                cellEditor: {
                    content: (props) => {
                        if (props.column.key === 'passed'){
                            return <CustomLookupEditor {...props}/>
                        }
                    }
                },
                filterRowCell: {
                    content: (props) => {
                        switch (props.column.key){
                        case 'passed': return <CustomLookupEditor {...props}/>;
                        case 'name': return <></>;
                        case 'score': return <NumberEditor {...props}/>;
                        case 'nextTry': return <DateEditor {...props}/>;
                        }
                    }
                }
            }}
        />
    );
};

export default FilterRowCustomEditorDemo;
