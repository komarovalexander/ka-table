import { DataType, EditingMode } from '../../enums';

import DataAndDetailsRows from './DataAndDetailsRows';
import { IRowProps } from '../../props';
import React from 'react';
import ReactDOM from 'react-dom';

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
    isSelectedRow: false,
    rowData: [{ column: 1, column2: 2 }],
    rowEditableCells: [],
    rowKeyField: 'column',
    rowKeyValue: 1,
    selectedRows: [],
} as any;

it('renders without crashing', () => {
    const element = document.createElement('tbody');
    ReactDOM.render(<DataAndDetailsRows {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
});
