import { ActionType } from '../../enums';
import { ITableAllProps } from '../Table/Table';
import { StrictMode } from 'react';
import { TableControlled } from './TableControlled';
import { createRoot } from 'react-dom/client';
import { insertRow } from '../../actionCreators';
import { render } from '@testing-library/react';

const props: ITableAllProps = {
    columns: [
        { key: 'column' },
        { key: 'column2' },
    ],
    data: [
        { column: 1, column2: 2, id: 1 },
        { column: 12, column2: 22, id: 2 },
    ],
    dispatch: vi.fn(),
    rowKeyField: 'id',
};

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);
    root.render(<TableControlled {...props} />);
    root.unmount();
});

// StrictMode runs the effects twice in the development mode
describe('StrictMode', () => {
    it('dispatches ComponentDidMount once', () => {
        const dispatch = vi.fn();
        render(<StrictMode><TableControlled {...props} dispatch={dispatch} /></StrictMode>);
        expect(dispatch.mock.calls.filter(([action]) => action.type === ActionType.ComponentDidMount)).toHaveLength(1);
    });
    it('dispatches singleAction once, and again when it is set again after it is cleared', () => {
        const dispatch = vi.fn();
        const singleAction = insertRow({ column: 3, column2: 4, id: 3 });
        const getInserts = () => dispatch.mock.calls.filter(([action]) => action.type === ActionType.InsertRow).length;
        const { rerender } = render(<StrictMode><TableControlled {...props} dispatch={dispatch} singleAction={singleAction} /></StrictMode>);
        expect(getInserts()).toBe(1);
        // the parent renders the table again before singleAction is cleared
        rerender(<StrictMode><TableControlled {...props} dispatch={dispatch} singleAction={singleAction} /></StrictMode>);
        expect(getInserts()).toBe(1);
        rerender(<StrictMode><TableControlled {...props} dispatch={dispatch} /></StrictMode>);
        rerender(<StrictMode><TableControlled {...props} dispatch={dispatch} singleAction={singleAction} /></StrictMode>);
        expect(getInserts()).toBe(2);
    });
});
