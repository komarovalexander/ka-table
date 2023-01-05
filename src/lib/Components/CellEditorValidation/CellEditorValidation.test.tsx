import { DataType, EditingMode } from '../../enums';

import CellEditorValidation from './CellEditorValidation';
import { ICellEditorProps } from '../../props';
import React from 'react';
import ReactDOM from 'react-dom';

const props: ICellEditorProps = {
    column: {
        dataType: DataType.String,
        key: 'column',
        title: 'Field',
    },
    dispatch: () => {},
    editingMode: EditingMode.None,
    field: 'column',
    isSelectedRow: true,
    rowData: [{ column: 12, id: 1 }],
    rowKeyField: 'id',
    rowKeyValue: 1,
    value: 12,
} as any;

it('renders without crashing', () => {
    const element = document.createElement('td');
    ReactDOM.render(<CellEditorValidation {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
});
