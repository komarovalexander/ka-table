import { act } from '@testing-library/react';
import { DataType, EditingMode } from '../../enums';

import DataRow from './DataRow';
import { IRowProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { renderInto } from '../../../testUtils/renderInto';

const props: IRowProps = {
    childComponents: {},
    columns: [
        { key: 'column', title: 'Column 1', dataType: DataType.String },
        { key: 'column2', title: 'Column 2', dataType: DataType.String },
    ],
    dispatch: () => {},
    editableCells: [],
    editingMode: EditingMode.None,
    groupColumnsCount: 0,
    isDetailsRowShown: false,
    isSelectedRow: false,
    rowData: [{ column: 1, column2: 2 }],
    rowEditableCells: [],
    rowKeyField: 'column',
    rowKeyValue: 1,
    rowReordering: false,
    selectedRows: [],
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe('DataRow', () => {
    it('renders without crashing', () => {
        const element = document.createElement('tbody');
        const root = createRoot(element!);
        act(() => {
            root.render(<DataRow {...props} />);
        });
        act(() => {
            root.unmount();
        });
    });

    it('renders with draggable', () => {
        const { container } = renderInto('tbody', <DataRow {...props} rowReordering={true} />);
        expect(container.querySelector('tr')!.getAttribute('draggable')).toBe('true');
    });

    it('renders without draggable', () => {
        const { container } = renderInto('tbody', <DataRow {...props} />);
        expect(container.querySelector('tr')!.getAttribute('draggable')).toBeNull();
    });

    it('overrides default ref', () => {
        const ref = vi.fn();
        renderInto('tbody', (
            <DataRow
                {...props}
                childComponents={{
                    dataRow: { elementAttributes: () => ({ ref }) },
                }}
            />
        ));
        expect(ref).toHaveBeenCalled();
    });
});
