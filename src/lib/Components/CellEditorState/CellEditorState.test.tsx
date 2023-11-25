import CellEditorState from './CellEditorState';
import { DataType } from '../../enums';
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
    isSelectedRow: true,
    onValueChange: () => {},
    rowData: { column: 1 },
    rowKeyField: '',
} as any;

it('renders without crashing', () => {
    const element = document.createElement('td');
    const root = createRoot(element!);
    root.render(<CellEditorState {...props} />);
    root.unmount();
});
