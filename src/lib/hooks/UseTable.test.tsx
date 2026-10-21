import * as React from 'react';

import { ITableInstance, Table } from '..';
import { act, render, renderHook } from '@testing-library/react';
import { getTable, useTable } from './UseTable';
import { selectRow } from '../actionCreators';

vi.useFakeTimers();

describe('UseTable', () => {
    it('customReducer', () => {
        const customReducer = vi.fn().mockImplementation((state, action) => {
            if (action.type === 'CUSTOM_ACTION'){
                return {...state, data: [{id : 2}]}
            }
        });
        let table: ITableInstance;
        const TableWithCustomReducer = () => {
            table = useTable({ customReducer });
            return <Table table={table} rowKeyField='id' columns={[{ key: 'id'}]} data={[]}/>;
        };
        render(<TableWithCustomReducer />);
        act(() => {
            table.dispatch({ type: 'CUSTOM_ACTION' });
        });
        vi.runAllTimers();
        expect(customReducer).toHaveBeenCalledTimes(2);
        expect(customReducer.mock.calls[1]).toMatchSnapshot();
        expect(customReducer.mock.results[1]).toMatchSnapshot();
    });
    it('returns the same instance on every render', () => {
        const { result, rerender } = renderHook(() => useTable());
        const table = result.current;
        rerender();
        expect(result.current).toBe(table);
    });
    it('uses the latest callbacks', () => {
        const onDispatch1 = vi.fn();
        const onDispatch2 = vi.fn();
        const customReducer = vi.fn();
        const { result, rerender } = renderHook(({ onDispatch }) => useTable({ onDispatch, customReducer }), {
            initialProps: { onDispatch: onDispatch1 },
        });
        rerender({ onDispatch: onDispatch2 });
        expect(result.current.onDispatch).toBe(onDispatch2);
        expect(result.current.customReducer).toBe(customReducer);
    });
    it('methods can be called without the table object', () => {
        const { result } = renderHook(() => useTable());
        const dispatch = vi.fn();
        result.current.dispatch = dispatch;
        const { selectRow: selectRowMethod } = result.current;
        selectRowMethod(1);
        expect(dispatch).toHaveBeenCalledWith(selectRow(1));
    });
    it('getTable creates a table outside of components', () => {
        const table = getTable();
        const dispatch = vi.fn();
        table.dispatch = dispatch;
        table.selectRow(1);
        expect(dispatch).toHaveBeenCalledWith(selectRow(1));
    });
});
