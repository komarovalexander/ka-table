import React from 'react';

import { updateFilterRowOperator, updateFilterRowValue } from '../../lib/actionCreators';
import { Column } from '../../lib/models';
import { IFilterRowEditorProps } from '../../lib/props';
import { DispatchFunc } from '../../lib/types';
import { kaDateUtils } from '../../lib/utils';

export const CustomLookupEditor: React.FC<IFilterRowEditorProps> = ({
    column, dispatch,
}) => {
    const toNullableBoolean = (value: string) => {
        switch (value) {
        case 'true': return true;
        case 'false': return false;
        }
        return value;
    };
    return (
        <>
            <select
                className='form-select'
                defaultValue={String(column.filterRowValue ?? '')}
                style={{width: 100}}
                onChange={(event) => {
                    dispatch(updateFilterRowValue(column.key, toNullableBoolean(event.currentTarget.value)));
                }}>
                <option value=''/>
                <option value={'true'}>True</option>
                <option value={'false'}>False</option>
            </select>
        </>
    );
};

const FilterOperators: React.FC<{ column: Column; dispatch: DispatchFunc }> = ({
    column, dispatch,
}) => {
    return (
        <select
            className='form-select'
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

export const NumberEditor: React.FC<IFilterRowEditorProps> = ({
    column, dispatch,
}) => {
    return (
        <>
            <FilterOperators column={column} dispatch={dispatch}/>
            <input
                className='form-control'
                defaultValue={String(column.filterRowValue ?? '')}
                style={{width: 100}}
                onChange={(event) => {
                    const filterRowValue = event.currentTarget.value !== '' ? Number(event.currentTarget.value) : null;
                    dispatch(updateFilterRowValue(column.key, filterRowValue));
                }}
                type='number'
            />
        </>
    );
};

export const DateEditor: React.FC<IFilterRowEditorProps> = ({
    column, dispatch,
}) => {
    return (
        <>
            <FilterOperators column={column} dispatch={dispatch}/>
            <input
                className='form-control'
                type='date'
                value={kaDateUtils.getDateInputValue(column.filterRowValue)}
                onChange={(event) => {
                    // the local date: new Date('YYYY-MM-DD') would be the midnight of UTC, the previous day west of it
                    dispatch(updateFilterRowValue(column.key, kaDateUtils.getDateFromInputValue(event.currentTarget.value)));
                }}
            />
        </>
    );
};
