import { DataType, EditingMode } from '../../enums';

import CellEditor from './CellEditor';
import React from 'react';
import { createRoot } from 'react-dom/client';

const props: any = {
    childComponents: {},
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
};

it('renders without crashing', () => {
    const element = document.createElement('td');
    const root = createRoot(element!);
    root.render(<CellEditor {...props} />);
    root.unmount();
});
