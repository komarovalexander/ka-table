import { ActionType, DataType } from '../../enums';
import { act, fireEvent, render } from '@testing-library/react';

import FilterRowDate from './FilterRowDate';
import { IFilterRowEditorProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

const props: IFilterRowEditorProps = {
    column: {
        dataType: DataType.Date,
        key: 'fieldName',
        title: 'Field',
    },
    dispatch: jest.fn(),
} as any;

describe('FliterRowDate', () => {
    it('renders without crashing', () => {
        const element = document.createElement('td');
        const root = createRoot(element!);
        act(() => {
            root.render(<FilterRowDate {...props} />);
        });
        act(() => {
            root.unmount();
        });
    });

    it('should fire UpdateFilterRowValue', () => {
        const column = {
            field: 'name',
            key: 'nameKey',
            dataType: DataType.Date,
        };
        const { container } = render(<FilterRowDate {...props} column={column} />);

        fireEvent.change(container.querySelector('input')!, { target: { value: '2020-02-02' } });
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.dispatch).toHaveBeenCalledWith({
            type: ActionType.UpdateFilterRowValue,
            filterRowValue: new Date(2020, 1, 2), // the date from the input is converted to the local date
            columnKey: 'nameKey',
        });
    });
});
