import * as React from 'react';

import { Table } from '..';
import { act } from '@testing-library/react';
import { createRoot } from 'react-dom/client';
import { useTable } from './UseTable';

jest.useFakeTimers();

describe('UseTable', () => {
    it('customReducer', () => {
        const customReducer = jest.fn().mockImplementation((state, action) => {
            if (action.type === 'CUSTOM_ACTION'){
                return {...state, data: [{id : 2}]}
            }
        });
        const table = useTable({
            customReducer
        });

        const div = document.createElement('div');
        const root = createRoot(div!);
        act(() => {
            root.render(<Table table={table} rowKeyField='id' columns={[{ key: 'id'}]} data={[]}/>);
        });
        act(() => {
            table.dispatch({ type: 'CUSTOM_ACTION' });
        });
        jest.runAllTimers();
        expect(customReducer).toHaveBeenCalledTimes(2);
        expect(customReducer.mock.calls[1]).toMatchSnapshot();
        expect(customReducer.mock.results[1]).toMatchSnapshot();
    });
});
