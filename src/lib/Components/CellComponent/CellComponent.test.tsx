import { DataType, EditingMode } from '../../enums';

import CellComponent from './CellComponent';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ICellProps } from '../../props';

const props: ICellProps = {
    childComponents: {},
    column: {
        dataType: DataType.String,
        key: 'columnField',
        title: 'Field',
    },
    dispatch: () => {},
    editingMode: EditingMode.None,
    field: 'columnField',
    isDetailsRowShown: false,
    isEditableCell: false,
    isSelectedRow: false,
    rowData: {
        column: 1,
    },
    rowKeyField: '1',
    rowKeyValue: undefined,
    selectedRows: [],
    value: undefined,
};

it('renders without crashing', () => {
    const element = document.createElement('tr');
    const root = createRoot(element!);
    root.render(<CellComponent {...props} />);
    root.unmount();
});
