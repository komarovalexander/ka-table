import { act } from '@testing-library/react';
import { DataType, EditingMode } from '../../enums';

import DetailsRow from './DetailsRow';
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
    isSelectedRow: false,
    groupColumnsCount: 0,
    rowData: [{ column: 1, column2: 2 }],
    rowKeyField: 'column',
    rowKeyValue: 1,
    selectedRows: [],
} as any;

it('renders without crashing', () => {
    const element = document.createElement('tbody');
    const root = createRoot(element!);
    act(() => {
        root.render(<DetailsRow {...props} />);
    });
    act(() => {
        root.unmount();
    });
});

it('Should add colSpan to details row', () => {
    const { container } = renderInto('tbody', (
        <DetailsRow
            {...props}
            childComponents={{
                detailsRow: {
                    content: () => <>Details Row</>,
                },
            }}
        />
    ));
    const cells = container.querySelectorAll('td');
    expect(cells.length).toBe(1);
    expect(cells[0].colSpan).toBe(2);
    expect(cells[0].textContent).toBe('Details Row');
});
