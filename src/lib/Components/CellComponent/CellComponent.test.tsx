import { DataType, EditingMode } from '../../enums';

import Adapter from '@cfaester/enzyme-adapter-react-18';
import CellComponent from './CellComponent';
import Enzyme from 'enzyme';
import React from 'react';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });

const props: any = {
    childComponents: {},
    column: {
        dataType: DataType.String,
        key: 'columnField',
        title: 'Field',
    },
    dispatch: () => {},
    editingMode: EditingMode.None,
    isEditableCell: false,
    isSelectedRow: false,
    rowData: {
        column: 1,
    },
    rowKeyField: '1',
};

it('renders without crashing', () => {
    const element = document.createElement('tr');
    const root = createRoot(element!);
    root.render(<CellComponent {...props} />);
    root.unmount();
});
