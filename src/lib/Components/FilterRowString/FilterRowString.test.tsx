import { ActionType, DataType } from '../../enums';
import { act, fireEvent, render } from '@testing-library/react';

import FilterRowString from './FilterRowString';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { IFilterRowEditorProps } from '../../props';

const props = {
    column: {
        dataType: DataType.String,
        key: 'columnField',
        title: 'Field',
    },
    dispatch: vi.fn(),
    isSelectedRow: true,
    rowData: { column: 1 },
    rowKeyField: '',
} as IFilterRowEditorProps;

describe('FilterRowString', () => {
    it('renders without crashing', () => {
        const element = document.createElement('td');
        const root = createRoot(element!);
        act(() => {
            root.render(<FilterRowString {...props} />);
        });
        act(() => {
            root.unmount();
        });
    });

    it('FilterRowString: should pass field name to filterCellValueChangeHandler', () => {
        const newValue = '2';
        const column = { field: 'name', key: 'nameKey' };
        const { container } = render(<FilterRowString {...props} column={column} />);

        fireEvent.change(container.querySelector('input')!, { target: { value: newValue } });
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.dispatch).toHaveBeenCalledWith(
            { type: ActionType.UpdateFilterRowValue, columnKey: 'nameKey', filterRowValue: newValue },
        );
    });

    it('shows the value 0', () => {
        const { container } = render(<FilterRowString {...props} column={{ ...props.column, filterRowValue: 0 }} />);
        expect(container.querySelector('input')!.value).toBe('0');
    });
});
