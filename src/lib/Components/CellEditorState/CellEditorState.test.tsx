import CellEditorState from './CellEditorState';
import { DataType, EditingMode } from '../../enums';
import { ICellEditorProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

const props: ICellEditorProps = {
    column: {
        dataType: DataType.String,
        key: 'columnField',
        title: 'Field',
    },
    dispatch: () => {},
    editingMode: EditingMode.None,
    field: 'columnField',
    isDetailsRowShown: false,
    isSelectedRow: true,
    rowData: { column: 1 },
    rowKeyField: '',
    rowKeyValue: undefined,
    selectedRows: [],
    value: undefined,
};

it('renders without crashing', () => {
    const element = document.createElement('td');
    const root = createRoot(element!);
    root.render(<CellEditorState {...props} />);
    root.unmount();
});
