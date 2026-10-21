import { ActionType, DataType, EditingMode } from '../../enums';
import { act, fireEvent, render } from '@testing-library/react';

import CellText from './CellText';
import { ICellTextProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

const props: ICellTextProps = {
    childComponents: {},
    column: {
        dataType: DataType.String,
        key: 'columnField',
        title: 'Field',
    },
    dispatch: vi.fn(),
    editingMode: EditingMode.Cell,
    field: 'columnField',
    isSelectedRow: false,
    rowData: { columnField: 'columnFieldValue', id: 1 },
    rowKeyField: 'id',
    rowKeyValue: 1,
    value: 'columnFieldValue',
} as any;

afterEach(() => vi.clearAllMocks());

describe('CellText', () => {
    it('renders without crashing', () => {
        const element = document.createElement('td');
        const root = createRoot(element!);
        act(() => {
            root.render(<CellText {...props} />);
        });
        act(() => {
            root.unmount();
        });
    });

    it('should dispatch OpenEditor', () => {
        const { container } = render(<CellText {...props} />);

        fireEvent.click(container.querySelector('.ka-cell-text')!);
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.dispatch).toHaveBeenCalledWith({
            type: ActionType.OpenEditor,
            columnKey: 'columnField',
            rowKeyValue: 1,
        });
    });

    it('should skip OpenEditor', () => {
        const { container } = render(
            <CellText {...props} editingMode={EditingMode.None} />
        );
        fireEvent.click(container.querySelector('.ka-cell-text')!);
        expect(props.dispatch).toHaveBeenCalledTimes(0);
    });
});
