import { DataType, EditingMode } from '../../enums';

import DataRowContent from './DataRowContent';
import { IDataRowProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act, fireEvent } from '@testing-library/react';
import { renderInto } from '../../../testUtils/renderInto';

const props: IDataRowProps = {
    childComponents: {},
    columns: [
        { key: 'column', title: 'Column 1', dataType: DataType.String },
        { key: 'column2', title: 'Column 2', dataType: DataType.String },
    ],
    dispatch: () => { },
    editableCells: [],
    editingMode: EditingMode.None,
    isSelectedRow: false,
    isDetailsRowShown: false,
    rowEditableCells: [],
    rowData: [{ column: 1, column2: 2 }],
    rowKeyField: 'column',
    rowKeyValue: '',
    selectedRows: [],
};

describe('DataRowContent', () => {
    it('renders without crashing', () => {
        const element = document.createElement('tr');
        const root = createRoot(element!);
        act(() => {
            root.render(<DataRowContent {...props} />);
        });
        act(() => {
            root.unmount();
        });
    });
    it('click by first row dispatches action', () => {
        const dispatch = jest.fn();
        const { container } = renderInto('tr', <DataRowContent {...props} dispatch={dispatch} isTreeGroup={true} />);
        expect(dispatch).toHaveBeenCalledTimes(0);
        fireEvent.click(container.querySelector('.ka-icon-tree-arrow')!);
        expect(dispatch).toHaveBeenCalledTimes(1);
    });
});
