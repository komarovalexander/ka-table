import { ActionType, DataType } from '../../enums';
import { act, fireEvent, render } from '@testing-library/react';

import FilterRowNumber from './FilterRowNumber';
import React from 'react';
import { createRoot } from 'react-dom/client';

const props: any = {
    column: {
        dataType: DataType.String,
        key: 'columnField',
        title: 'Field',
    },
    dispatch: vi.fn(),
    rowData: { column: 1 },
};

describe('FilterRowNumber', () => {
    it('renders without crashing', () => {
        const element = document.createElement('td');
        const root = createRoot(element!);
        act(() => {
            root.render(<FilterRowNumber {...props} />);
        });
        act(() => {
            root.unmount();
        });
    });

    it('should fire FilterRowChanged', () => {
        const newValue = 2;
        const column = { field: 'name', key: 'nameKey', dataType: DataType.Number };
        const { container } = render(<FilterRowNumber {...props} column={column} />);

        fireEvent.change(container.querySelector('input')!, { target: { value: `${newValue}` } });
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.dispatch).toHaveBeenCalledWith({
            columnKey: 'nameKey',
            filterRowValue: newValue,
            type: ActionType.UpdateFilterRowValue,
        });
    });
});
